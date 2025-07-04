package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.FlightCreationDto;
import com.Brinah.FlightBooking.DTO.FlightDto;
import com.Brinah.FlightBooking.DTO.FlightResponse;
import com.Brinah.FlightBooking.DTO.FlightSearchRequest;
import com.Brinah.FlightBooking.DTO.FlightStatisticsDto;
import com.Brinah.FlightBooking.Entity.*;
import com.Brinah.FlightBooking.Enum.FlightStatus;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.*;
import com.Brinah.FlightBooking.Service.Interface.FlightService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import com.Brinah.FlightBooking.Utils.SeatGenerator;
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
    private final RouteRepository routeRepository;
    private final SeatRepository seatRepository;
    private final SeatGenerator seatGenerator;
    private final ModelMapperUtil modelMapper;

    @Override
    public FlightDto createFlight(FlightCreationDto flightDto) {
        Aircraft aircraft = aircraftRepository.findById(flightDto.getAircraftId())
                .orElseThrow(() -> new ResourceNotFoundException("Aircraft", "ID", flightDto.getAircraftId()));

        Airport departureAirport = airportRepository.findById(flightDto.getDepartureAirportId())
                .orElseThrow(() -> new ResourceNotFoundException("Departure Airport", "ID", flightDto.getDepartureAirportId()));

        Airport arrivalAirport = airportRepository.findById(flightDto.getArrivalAirportId())
                .orElseThrow(() -> new ResourceNotFoundException("Arrival Airport", "ID", flightDto.getArrivalAirportId()));

        // 🛫 Dynamically create Route
        Route route = Route.builder()
                .economyPrice(flightDto.getEconomyPrice())
                .businessPrice(flightDto.getBusinessPrice())
                .firstClassPrice(flightDto.getFirstClassPrice())
                .aircraft(aircraft)
                .build();
        route = routeRepository.save(route);

        // ✈️ Create Flight
        Flight flight = Flight.builder()
                .id(flightDto.getId()) // Optional, can be null for new flights
                .flightNumber(flightDto.getFlightNumber())
                .departureTime(flightDto.getDepartureTime())
                .arrivalTime(flightDto.getArrivalTime())
                .departureAirport(departureAirport)
                .arrivalAirport(arrivalAirport)
                .aircraft(aircraft)
                .route(route)
                .status(FlightStatus.ACTIVE)
                .build();
        Flight savedFlight = flightRepository.save(flight);

        // 💺 Generate and persist seats
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

    @Override
    public FlightStatisticsDto getFlightStatistics() {
        long total = flightRepository.count();
        long active = flightRepository.countByStatus(FlightStatus.ACTIVE);
        long completed = flightRepository.countByStatus(FlightStatus.COMPLETED); // optional if you support this status
        return new FlightStatisticsDto(total, active, completed);
    }

    // ✨ Helper to convert Flight to DTO
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

        dto.setEconomyPrice(flight.getRoute().getEconomyPrice());
        dto.setBusinessPrice(flight.getRoute().getBusinessPrice());
        dto.setFirstClassPrice(flight.getRoute().getFirstClassPrice());

        dto.setFlightStatus(flight.getStatus() != null ? flight.getStatus().name() : "UNKNOWN");

        return dto;
    }
}
