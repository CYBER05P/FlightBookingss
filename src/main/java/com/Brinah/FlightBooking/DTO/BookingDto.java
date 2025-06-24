package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class BookingDto {
    private Long id;
    private String confirmationCode;

    private String name;
    private String idOrPassport;

    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private List<String> seatNumbers;
    private List<String> seatClasses;

    private double totalPrice;

    // ✅ QR Code as Base64 string (image for frontend or email)
    private String qrCodeBase64;
}
