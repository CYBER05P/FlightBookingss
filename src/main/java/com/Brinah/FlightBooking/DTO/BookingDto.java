package com.Brinah.FlightBooking.DTO;

import lombok.Data;

    @Data
    public class BookingDto {
        private Long id;
        private String confirmationCode;
        private String name;           // instead of userId
        private String flightNumber;   // instead of flightId
        private String seatNumber;     // instead of seatId
    }


