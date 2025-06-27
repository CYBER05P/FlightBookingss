package com.Brinah.FlightBooking.Repositories;


import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    List<Booking> findByUser(User user); // ✅ Correct

}