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
    public FlightDto createFlight(FlightCreationDto dto) {
        // Aircraft reuse or creation
        Aircraft aircraft = aircraftRepository.findByModel(dto.getAircraftModel())
                .orElseGet(() -> aircraftRepository.save(Aircraft.builder()
                        .model(dto.getAircraftModel())
                        .economySeats(dto.getEconomySeats())
                        .businessSeats(dto.getBusinessSeats())
                        .firstClassSeats(dto.getFirstClassSeats())
                        .build()));

        // Departure airport reuse or creation
        Airport dep = airportRepository
                .findByNameAndCityAndCountry(dto.getDepartureAirportName(), dto.getDepartureCity(), dto.getDepartureCountry())
                .orElseGet(() -> airportRepository.save(Airport.builder()
                        .name(dto.getDepartureAirportName())
                        .city(dto.getDepartureCity())
                        .country(dto.getDepartureCountry())
                        .code(generateCode(dto.getDepartureAirportName()))
                        .build()));

        // Arrival airport reuse or creation
        Airport arr = airportRepository
                .findByNameAndCityAndCountry(dto.getArrivalAirportName(), dto.getArrivalCity(), dto.getArrivalCountry())
                .orElseGet(() -> airportRepository.save(Airport.builder()
                        .name(dto.getArrivalAirportName())
                        .city(dto.getArrivalCity())
                        .country(dto.getArrivalCountry())
                        .code(generateCode(dto.getArrivalAirportName()))
                        .build()));

        // Build and save Flight
        Flight flight = flightRepository.save(Flight.builder()
                .flightNumber(dto.getFlightNumber())
                .departureTime(dto.getDepartureTime())
                .arrivalTime(dto.getArrivalTime())
                .economyPrice(dto.getEconomyPrice())
                .businessPrice(dto.getBusinessPrice())
                .firstClassPrice(dto.getFirstClassPrice())
                .status(dto.getFlightStatus() != null ? dto.getFlightStatus() : FlightStatus.ACTIVE)
                .aircraft(aircraft)
                .departureAirport(dep)
                .arrivalAirport(arr)
                .build());

        // Generate and save seats
        List<Seat> seats = seatGenerator.generateSeatsForFlight(flight);
        seatRepository.saveAll(seats);

        return convertToDto(flight);
    }

    @Override
    public FlightDto updateFlight(Long id, FlightCreationDto dto) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", id));

        flight.setFlightNumber(dto.getFlightNumber());
        flight.setDepartureTime(dto.getDepartureTime());
        flight.setArrivalTime(dto.getArrivalTime());
        flight.setEconomyPrice(dto.getEconomyPrice());
        flight.setBusinessPrice(dto.getBusinessPrice());
        flight.setFirstClassPrice(dto.getFirstClassPrice());
        flight.setStatus(dto.getFlightStatus() != null ? dto.getFlightStatus() : flight.getStatus());
        // (Could update aircraft/airports similarly if necessary)

        return convertToDto(flightRepository.save(flight));
    }

    @Override
    public FlightDto getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", id));
        return convertToDto(flight);
    }

    @Override
    public List<FlightDto> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FlightResponse> searchFlights(FlightSearchRequest req) {
        return flightRepository.structuredSearch(req.getFrom(), req.getTo(), req.getDate(), FlightStatus.ACTIVE)
                .stream()
                .map(modelMapper::toFlightResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteFlight(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", id));
        flightRepository.delete(flight); // cascading seats removal if configured
    }

    @Transactional
    @Override
    public void deleteAllFlights() {
        bookingRepository.deleteAll();
        flightRepository.deleteAll();
    }

    @Override
    public List<FlightStatsDto> getFlightStatistics() {
        return flightRepository.findAll().stream().map(flight -> {
            List<Seat> seats = flight.getSeats();
            int total = seats.size();
            int booked = (int) seats.stream().filter(s -> !s.getAvailable()).count();
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

    private FlightDto convertToDto(Flight f) {
        FlightDto dto = new FlightDto();
        dto.setId(f.getId());
        dto.setFlightNumber(f.getFlightNumber());
        dto.setDepartureTime(f.getDepartureTime());
        dto.setArrivalTime(f.getArrivalTime());
        dto.setDepartureAirportCode(f.getDepartureAirport().getCode());
        dto.setDepartureAirportCity(f.getDepartureAirport().getCity());
        dto.setArrivalAirportCode(f.getArrivalAirport().getCode());
        dto.setArrivalAirportCity(f.getArrivalAirport().getCity());
        dto.setAircraftModel(f.getAircraft().getModel());
        dto.setAircraftId(f.getAircraft().getId());
        dto.setEconomyPrice(f.getEconomyPrice());
        dto.setBusinessPrice(f.getBusinessPrice());
        dto.setFirstClassPrice(f.getFirstClassPrice());
        dto.setFlightStatus(f.getStatus().name());
        return dto;
    }

    private String generateCode(String name) {
        if (name == null || name.length() < 3) {
            return name == null ? "UNK" : name.toUpperCase();
        }
        return name.substring(0, 3).toUpperCase();
    }
}
