package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightCreationDto {

    private String flightNumber;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    // Required relationships by ID
    private Long aircraftId;
    private Long departureAirportId;
    private Long arrivalAirportId;

    // Prices that will go into the Route
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;

    // Optional flight ID (if needed for updates)
    private Long id;
}
