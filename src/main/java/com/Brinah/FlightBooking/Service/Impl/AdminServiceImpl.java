package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.AircraftDto;
import com.Brinah.FlightBooking.DTO.AirportDto;
import com.Brinah.FlightBooking.Entity.Aircraft;
import com.Brinah.FlightBooking.Entity.Airport;
import com.Brinah.FlightBooking.Repositories.AircraftRepository;
import com.Brinah.FlightBooking.Repositories.AirportRepository;
import com.Brinah.FlightBooking.Service.Interface.AdminService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AircraftRepository aircraftRepository;
    private final AirportRepository airportRepository;
    private final ModelMapperUtil modelMapper;

    @Override
    public AircraftDto addAircraft(AircraftDto dto) {
        Aircraft aircraft = modelMapper.toAircraftEntity(dto);
        Aircraft saved = aircraftRepository.save(aircraft);
        return modelMapper.toAircraftDto(saved);
    }

    @Override
    public List<AircraftDto> addAircraftBulk(List<AircraftDto> dtos) {
        return dtos.stream()
                .map(this::addAircraft)
                .collect(Collectors.toList());
    }

    @Override
    public List<AircraftDto> getAllAircraft() {
        return aircraftRepository.findAll()
                .stream()
                .map(modelMapper::toAircraftDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAircraft(Long id) {
        if (!aircraftRepository.existsById(id)) {
            throw new RuntimeException("Aircraft not found with id: " + id);
        }
        aircraftRepository.deleteById(id);
    }

    @Override
    public AirportDto addAirport(AirportDto dto) {
        Airport airport = modelMapper.toAirportEntity(dto);
        Airport saved = airportRepository.save(airport);
        return modelMapper.toAirportDto(saved);
    }

    @Override
    public List<AirportDto> addAirportBulk(List<AirportDto> dtos) {
        return dtos.stream()
                .map(this::addAirport)
                .collect(Collectors.toList());
    }

    @Override
    public List<AirportDto> getAllAirports() {
        return airportRepository.findAll()
                .stream()
                .map(modelMapper::toAirportDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAirport(Long id) {
        if (!airportRepository.existsById(id)) {
            throw new RuntimeException("Airport not found with id: " + id);
        }
        airportRepository.deleteById(id);
    }
}
