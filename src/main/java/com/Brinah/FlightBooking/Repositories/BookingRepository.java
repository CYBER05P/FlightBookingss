package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.DTO.BookingStatsDto;
import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Entity.User; // Assuming User is your entity for users
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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
    void deleteByFlightId(Long flightId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Booking")
    void deleteAllBookings();

    // FIX: Changed 'aircraft.name' to 'aircraft.model'
    @Query("SELECT new com.Brinah.FlightBooking.DTO.BookingStatsDto(b.flight.aircraft.model, COUNT(b)) " +
            "FROM Booking b GROUP BY b.flight.aircraft.model")
    List<BookingStatsDto> getBookingStatsPerAircraft();

}