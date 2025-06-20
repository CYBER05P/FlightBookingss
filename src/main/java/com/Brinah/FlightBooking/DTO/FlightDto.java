package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightDto {
    private Long id;
    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private Long aircraftId;
    private Long departureAirportId;
    private Long arrivalAirportId;
    private Long routeId;
}
