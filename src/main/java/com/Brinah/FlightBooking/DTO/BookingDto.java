package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingDto {
    private Long id;
    private String confirmationCode;

    // User Info
    private String name;
    private String email;
    private String idOrPassport;
    private String country;
    private LocalDate dateOfBirth;

    // Flight Info
    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    // Seats
    private List<String> seatNumbers;
    private List<String> seatClasses;

    // Price and booking
    private double totalPrice;
    private LocalDateTime bookingTime;

    // QR Code (Base64-encoded PNG)
    private String qrCodeBase64;
}
