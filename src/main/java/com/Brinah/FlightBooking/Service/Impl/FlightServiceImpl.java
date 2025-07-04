package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Entity.*;
import com.Brinah.FlightBooking.Enum.FlightStatus;
import com.Brinah.FlightBooking.Enum.SeatClass;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.*;
import com.Brinah.FlightBooking.Service.Interface.FlightService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import com.Brinah.FlightBooking.Utils.SeatGenerator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    private final AircraftRepository aircraftRepository;
    private final SeatRepository seatRepository;
    private final BookingRepository bookingRepository;
    private final SeatGenerator seatGenerator;
    private final ModelMapperUtil modelMapper;

    @Override
    public FlightDto createFlight(FlightCreationDto flightDto) {
        // Save or reuse aircraft
        Aircraft aircraft = aircraftRepository.findByModel(flightDto.getAircraftModel())
                .orElseGet(() -> {
                    Aircraft newAircraft = new Aircraft();
                    newAircraft.setModel(flightDto.getAircraftModel());
                    newAircraft.setEconomySeats(flightDto.getEconomySeats());
                    newAircraft.setBusinessSeats(flightDto.getBusinessSeats());
                    newAircraft.setFirstClassSeats(flightDto.getFirstClassSeats());
                    return aircraftRepository.save(newAircraft);
                });

        // Save or reuse departure airport
        Airport departureAirport = airportRepository.findByNameAndCityAndCountry(
                flightDto.getDepartureAirportName(),
                flightDto.getDepartureCity(),
                flightDto.getDepartureCountry()
        ).orElseGet(() -> {
            Airport airport = new Airport();
            airport.setName(flightDto.getDepartureAirportName());
            airport.setCity(flightDto.getDepartureCity());
            airport.setCountry(flightDto.getDepartureCountry());
            airport.setCode(generateCode(flightDto.getDepartureAirportName()));
            return airportRepository.save(airport);
        });

        // Save or reuse arrival airport
        Airport arrivalAirport = airportRepository.findByNameAndCityAndCountry(
                flightDto.getArrivalAirportName(),
                flightDto.getArrivalCity(),
                flightDto.getArrivalCountry()
        ).orElseGet(() -> {
            Airport airport = new Airport();
            airport.setName(flightDto.getArrivalAirportName());
            airport.setCity(flightDto.getArrivalCity());
            airport.setCountry(flightDto.getArrivalCountry());
            airport.setCode(generateCode(flightDto.getArrivalAirportName()));
            return airportRepository.save(airport);
        });

        // Create and save flight
        Flight flight = Flight.builder()
                .flightNumber(flightDto.getFlightNumber())
                .departureTime(flightDto.getDepartureTime())
                .arrivalTime(flightDto.getArrivalTime())
                .departureAirport(departureAirport)
                .arrivalAirport(arrivalAirport)
                .aircraft(aircraft)
                .economyPrice(flightDto.getEconomyPrice())
                .businessPrice(flightDto.getBusinessPrice())
                .firstClassPrice(flightDto.getFirstClassPrice())
                .status(flightDto.getFlightStatus() != null ? flightDto.getFlightStatus() : FlightStatus.ACTIVE)
                .build();

        Flight savedFlight = flightRepository.save(flight);

        // Generate and save seats
        List<Seat> seats = seatGenerator.generateSeatsForFlight(savedFlight);
        seatRepository.saveAll(seats);

        return convertToDto(savedFlight);
    }

    @Override
    public FlightDto getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", id));
        return convertToDto(flight);
    }

    @Override
    public List<FlightDto> getAllFlights() {
        return flightRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FlightResponse> searchFlights(FlightSearchRequest request) {
        List<Flight> flights = flightRepository.structuredSearch(
                request.getFrom(),
                request.getTo(),
                request.getDate(),
                FlightStatus.ACTIVE
        );
        return flights.stream()
                .map(modelMapper::toFlightResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new ResourceNotFoundException("Flight", "ID", id);
        }
        flightRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void deleteAllFlights() {
        bookingRepository.deleteAllBookings();
        flightRepository.deleteAll();
    }

    @Override
    public List<FlightStatsDto> getFlightStatistics() {
        return flightRepository.findAll().stream().map(flight -> {
            List<Seat> seats = flight.getSeats();
            int total = seats.size();
            int booked = (int) seats.stream().filter(seat -> !seat.getAvailable()).count();
            int available = total - booked;

            int econTotal = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.ECONOMY).count();
            int econBooked = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.ECONOMY && !s.getAvailable()).count();

            int busTotal = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.BUSINESS).count();
            int busBooked = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.BUSINESS && !s.getAvailable()).count();

            int firstTotal = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.FIRST).count();
            int firstBooked = (int) seats.stream().filter(s -> s.getSeatClass() == SeatClass.FIRST && !s.getAvailable()).count();

            return new FlightStatsDto(
                    flight.getFlightNumber(),
                    total, booked, available,
                    econTotal, econBooked, econTotal - econBooked,
                    busTotal, busBooked, busTotal - busBooked,
                    firstTotal, firstBooked, firstTotal - firstBooked
            );
        }).collect(Collectors.toList());
    }

    // Map Flight entity to DTO
    private FlightDto convertToDto(Flight flight) {
        FlightDto dto = new FlightDto();
        dto.setId(flight.getId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setDepartureAirportCode(flight.getDepartureAirport().getCode());
        dto.setDepartureAirportCity(flight.getDepartureAirport().getCity());
        dto.setArrivalAirportCode(flight.getArrivalAirport().getCode());
        dto.setArrivalAirportCity(flight.getArrivalAirport().getCity());
        dto.setAircraftModel(flight.getAircraft().getModel());
        dto.setAircraftId(flight.getAircraft().getId());
        dto.setEconomyPrice(flight.getEconomyPrice());
        dto.setBusinessPrice(flight.getBusinessPrice());
        dto.setFirstClassPrice(flight.getFirstClassPrice());
        dto.setFlightStatus(flight.getStatus() != null ? flight.getStatus().name() : "UNKNOWN");
        return dto;
    }

    // Generate airport code from name (first 3 letters uppercase)
    private String generateCode(String name) {
        return name.length() < 3 ? name.toUpperCase() : name.substring(0, 3).toUpperCase();
    }
}
