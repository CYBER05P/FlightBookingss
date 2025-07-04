package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByFlightId(Long flightId);
    List<Review> findByUserId(Long userId);
}
