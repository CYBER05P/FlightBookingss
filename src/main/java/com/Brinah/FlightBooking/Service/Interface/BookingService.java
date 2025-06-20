package com.Brinah.FlightBooking.Service.Interface;


import com.Brinah.FlightBooking.DTO.BookingDto;

import java.util.List;

public interface BookingService {
    BookingDto bookFlight(Long flightId, Long seatId, String userEmail);
    void cancelBooking(Long bookingId, String userEmail);
    List<BookingDto> getBookingsForUser(String userEmail);
    List<BookingDto> getAllBookings(); // For Admin
}