package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.*;

import java.util.List;

public interface FlightService {

    // Create a new flight
    FlightDto createFlight(FlightCreationDto flightDto);

    // Get flight by ID
    FlightDto getFlightById(Long id);

    // Get all flights
    List<FlightDto> getAllFlights();

    // Search for flights
    List<FlightResponse> searchFlights(FlightSearchRequest request);

    // Delete a flight by ID
    void deleteFlight(Long id);

    // Delete all flights (e.g., system reset)
    void deleteAllFlights();

    // Get full seat statistics per flight
    List<FlightStatsDto> getFlightStatistics();
}
