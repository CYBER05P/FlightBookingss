package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.SeatClass;
import lombok.Data;

@Data
public class BookingRequest {
    private Long id; // Optional, for updates
    private Long flightId;
    private String userEmail; // Automatically filled from backend
    private int numberOfAdults;
    private int numberOfChildren;
    private SeatClass seatClass; // ✅ New: Economy, Business, First
}
