package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.SeatDto;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.FlightRepository;
import com.Brinah.FlightBooking.Repositories.SeatRepository;
import com.Brinah.FlightBooking.Service.Interface.SeatService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;
    private final FlightRepository flightRepository;
    private final ModelMapperUtil modelMapper;

    @Override
    public List<SeatDto> getSeatsForFlight(Long flightId) {
        if (!flightRepository.existsById(flightId)) {
            throw new ResourceNotFoundException("Flight not found");
        }

        return seatRepository.findByFlightId(flightId)
                .stream()
                .map(modelMapper::toSeatDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SeatDto> getAvailableSeats(Long flightId, SeatClass seatClass) {
        if (!flightRepository.existsById(flightId)) {
            throw new ResourceNotFoundException("Flight not found");
        }

        return seatRepository.findByFlightIdAndSeatClassAndAvailableTrue(flightId, seatClass)
                .stream()
                .map(modelMapper::toSeatDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<Seat> findByFlightId(Long flightId) {
        return seatRepository.findByFlightId(flightId);
    }

    @Override
    public List<Seat> findByFlightIdAndSeatClassAndAvailableTrue(Long flightId, SeatClass seatClass) {
        return seatRepository.findByFlightIdAndSeatClassAndAvailableTrue(flightId, seatClass);
    }
}
