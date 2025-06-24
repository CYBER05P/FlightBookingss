package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    // All seats in a flight
    List<Seat> findByFlightId(Long flightId);

    // Seats of a specific class that are available
    List<Seat> findByFlightIdAndSeatClassAndAvailableTrue(Long flightId, SeatClass seatClass);

    // All available seats in a flight (for random assignment)

}
