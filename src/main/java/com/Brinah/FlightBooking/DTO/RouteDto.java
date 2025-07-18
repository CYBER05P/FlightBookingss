package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class RouteDto {
    private Long id;
    private String departureAirportCode;   // e.g. "NBO"
    private String arrivalAirportCode;     // e.g. "MBA"
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;
    private Long aircraftId;               // the aircraft assigned to route
}
