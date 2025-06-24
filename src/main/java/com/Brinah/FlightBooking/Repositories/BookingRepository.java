package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Fetch bookings by user
    List<Booking> findByUser(User user);

    // Optional: Fetch by user ID (not commonly needed if you already have the User object)
    List<Booking> findByUserId(Long userId);

    // Optional: Fetch by confirmation code
    Optional<Booking> findByConfirmationCode(String confirmationCode);
}
