package com.Brinah.FlightBooking.Service.Interface;


import com.Brinah.FlightBooking.DTO.BookingDto;
import com.Brinah.FlightBooking.DTO.BookingRequest;
import com.Brinah.FlightBooking.DTO.BookingStatsDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookingService {
    @Transactional
    BookingDto bookFlight(BookingRequest request);

    BookingDto bookFlight(Long flightId, Long seatId, String userEmail);
    void cancelBooking(Long bookingId, String userEmail);
    List<BookingDto> getBookingsForUser(String userEmail);
    List<BookingDto> getAllBookings();
    List<BookingDto> getBookingsByUserId(Long userId);
// For Admin
List<BookingStatsDto> getBookingStats();

}