// SeatRepository.java
package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightId(Long flightId);

    List<Seat> findByFlightIdAndSeatClassAndAvailableTrue(Long flightId, SeatClass seatClass);
}

