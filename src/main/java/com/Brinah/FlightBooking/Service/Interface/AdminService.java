package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.AircraftDto;
import com.Brinah.FlightBooking.DTO.AirportDto;

import java.util.List;

public interface AdminService {
    AircraftDto addAircraft(AircraftDto dto);
    List<AircraftDto> addAircraftBulk(List<AircraftDto> dtos);
    List<AircraftDto> getAllAircraft();
    void deleteAircraft(Long id);

    AirportDto addAirport(AirportDto dto);
    List<AirportDto> addAirportBulk(List<AirportDto> dtos);
    List<AirportDto> getAllAirports();
    void deleteAirport(Long id);
}
