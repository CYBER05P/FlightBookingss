package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightResponse {
    private Long flightId; // ✅ Java convention: camelCase

    private String flightNumber;

    // Departure details
    private String departureAirportCode;
    private String departureAirportName;
    private String departureCity;
    private String departureCountry;
    private LocalDateTime departureTime;

    // Arrival details
    private String arrivalAirportCode;
    private String arrivalAirportName;
    private String arrivalCity;
    private String arrivalCountry;
    private LocalDateTime arrivalTime;

    // Aircraft
    private String aircraftModel;

    // Prices
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;

    // Status
    private String flightStatus;
}
