package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.*;
import java.util.List;

public interface FlightService {
    FlightDto createFlight(FlightCreationDto flightDto);
    FlightDto updateFlight(Long id, FlightCreationDto flightDto);
    FlightDto getFlightById(Long id);
    List<FlightDto> getAllFlights();
    List<FlightResponse> searchFlights(FlightSearchRequest request);
    void deleteFlight(Long id);
    void deleteAllFlights();
    List<FlightStatsDto> getFlightStatistics();
}
