package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.FlightDto;
import com.Brinah.FlightBooking.DTO.FlightCreationDto;
import com.Brinah.FlightBooking.DTO.FlightResponse;
import com.Brinah.FlightBooking.DTO.FlightSearchRequest;

import java.util.List;

public interface FlightService {

    // ✅ Use FlightCreationDto for clean creation from frontend
    FlightDto createFlight(FlightCreationDto flightDto);


    // ✅ Retrieve full flight details
    FlightDto getFlightById(Long id);

    // ✅ List all flights (e.g., for admin view)
    List<FlightDto> getAllFlights();

    // ✅ Search flights for customer-friendly results
    List<FlightResponse> searchFlights(FlightSearchRequest request);

    // ✅ Delete a flight by ID
    void deleteFlight(Long id);

    void deleteAllFlights();

}
