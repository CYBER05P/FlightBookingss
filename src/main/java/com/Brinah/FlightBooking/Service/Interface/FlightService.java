package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.FlightDto;

import java.util.List;

public interface FlightService {
    FlightDto createFlight(FlightDto flightDto);
    FlightDto getFlightById(Long id);
    List<FlightDto> getAllFlights();
    List<FlightDto> searchFlights(String origin, String destination, String date);
    void deleteFlight(Long id);
}
