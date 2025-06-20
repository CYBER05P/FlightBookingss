package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.FlightDto;
import com.Brinah.FlightBooking.Entity.*;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.*;
import com.Brinah.FlightBooking.Service.Interface.FlightService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import com.Brinah.FlightBooking.Utils.SeatGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public FlightDto createFlight(FlightDto flightDto) {
        // Validate aircraft
        Aircraft aircraft = aircraftRepository.findById(flightDto.getAircraftId())
                .orElseThrow(() -> new ResourceNotFoundException("Aircraft not found with ID: " + flightDto.getAircraftId()));

        // Validate airports
        Airport departureAirport = airportRepository.findById(flightDto.getDepartureAirportId())
                .orElseThrow(() -> new ResourceNotFoundException("Departure airport not found with ID: " + flightDto.getDepartureAirportId()));
        Airport arrivalAirport = airportRepository.findById(flightDto.getArrivalAirportId())
                .orElseThrow(() -> new ResourceNotFoundException("Arrival airport not found with ID: " + flightDto.getArrivalAirportId()));

        // Validate route and set aircraft into route if not already done
        Route route = routeRepository.findById(flightDto.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with ID: " + flightDto.getRouteId()));

        if (route.getAircraft() == null) {
            route.setAircraft(aircraft);
            route = routeRepository.save(route);
        }

        // Map and prepare flight entity
        Flight flight = modelMapper.toFlightEntity(flightDto);
        flight.setAircraft(aircraft);
        flight.setDepartureAirport(departureAirport);
        flight.setArrivalAirport(arrivalAirport);
        flight.setRoute(route);

        // Save flight
        Flight savedFlight = flightRepository.save(flight);

        // Generate and save seats dynamically
        List<Seat> seats = seatGenerator.generateSeatsForFlight(savedFlight);
        seatRepository.saveAll(seats);

        return modelMapper.toFlightDto(savedFlight);
    }

    @Override
    public FlightDto getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with ID: " + id));
        return modelMapper.toFlightDto(flight);
    }

    @Override
    public List<FlightDto> getAllFlights() {
        return flightRepository.findAll()
                .stream()
                .map(modelMapper::toFlightDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FlightDto> searchFlights(String origin, String destination, String date) {
        // This method assumes a custom query exists in the repository
        return flightRepository.searchFlights(origin, destination, LocalDate.parse(date))
                .stream()
                .map(modelMapper::toFlightDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new ResourceNotFoundException("Flight not found with ID: " + id);
        }
        flightRepository.deleteById(id);
    }

    // Optional: Expose airport repo for external logic/testing
    public AirportRepository getAirportRepository() {
        return airportRepository;
    }
}
