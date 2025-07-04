package com.Brinah.FlightBooking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightStatsDto {
    private String flightNumber;
    private int totalSeats;
    private int bookedSeats;
    private int availableSeats;

    private int economyTotal;
    private int economyBooked;
    private int economyAvailable;

    private int businessTotal;
    private int businessBooked;
    private int businessAvailable;

    private int firstTotal;
    private int firstBooked;
    private int firstAvailable;
}
