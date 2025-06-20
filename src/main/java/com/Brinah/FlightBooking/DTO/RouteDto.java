package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class RouteDto {
    private Long id;
    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;
    private Long aircraftId;
}
