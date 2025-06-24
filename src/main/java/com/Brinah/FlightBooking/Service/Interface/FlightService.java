package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.FlightDto;
import com.Brinah.FlightBooking.DTO.FlightResponse;
import com.Brinah.FlightBooking.DTO.FlightSearchRequest;

import java.util.List;

public interface FlightService {

    FlightDto createFlight(FlightDto flightDto);

    FlightDto getFlightById(Long id);

    List<FlightDto> getAllFlights();
    List<FlightResponse> searchFlights(FlightSearchRequest request);

    void deleteFlight(Long id);
}
