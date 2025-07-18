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
    private Long departureAirportId;
    private String departureAirportCode;
    private String departureAirportCity;

    private Long arrivalAirportId;
    private String arrivalAirportCode;
    private String arrivalAirportCity;

    // Aircraft info
    private Long aircraftId;
    private String aircraftModel;

    // Pricing
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;

    // Flight status
    private String flightStatus;

    // (Optional backend fields)
    private Long routeId;
}
