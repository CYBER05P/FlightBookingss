package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class AircraftDto {
    private Long id;
    private String model;
    private int economySeats;
    private int businessSeats;
    private int firstClassSeats;
}
