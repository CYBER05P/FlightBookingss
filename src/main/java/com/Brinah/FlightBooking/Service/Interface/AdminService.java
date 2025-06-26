package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.AircraftDto;
import com.Brinah.FlightBooking.DTO.AirportDto;
import com.Brinah.FlightBooking.DTO.RouteDto;

import java.util.List;

public interface AdminService {
    AircraftDto addAircraft(AircraftDto dto);

    List<AircraftDto> getAllAircraft();

    AirportDto addAirport(AirportDto dto);

    List<AirportDto> getAllAirports();
}
