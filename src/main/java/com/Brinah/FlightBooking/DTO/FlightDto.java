package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightDto {
    private Long id;
    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    // Airport info
    private String departureAirportCode;
    private String departureAirportCity;
    private String arrivalAirportCode;
    private String arrivalAirportCity;

    // Aircraft info
    private String aircraftModel;
    private Long aircraftId;

    // Pricing from route
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;

    // Flight status
    private String flightStatus;

    // ✅ Add these if needed for backend operations
    private Long departureAirportId;
    private Long arrivalAirportId;
    private Long routeId;
}
