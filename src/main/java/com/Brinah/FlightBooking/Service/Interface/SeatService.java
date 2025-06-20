package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.SeatDto;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;

import java.util.List;

public interface SeatService {
    List<SeatDto> getSeatsForFlight(Long flightId);
    List<SeatDto> getAvailableSeats(Long flightId, SeatClass seatClass);
    List<Seat> findByFlightId(Long flightId);
    List<Seat> findByFlightIdAndSeatClassAndAvailableTrue(Long flightId, SeatClass seatClass);
}
