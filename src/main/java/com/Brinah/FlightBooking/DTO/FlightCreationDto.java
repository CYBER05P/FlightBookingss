package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.FlightStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FlightCreationDto {

    private String flightNumber;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private String departureCity;
    private String departureCountry;
    private String arrivalCity;
    private String arrivalCountry;

    private String departureAirportName;
    private String arrivalAirportName;

    private String aircraftModel;

    private double economyPrice;
    private double businessPrice;
    private double firstClassPrice;

    // ✅ Add these fields for seat configuration
    private int economySeats;
    private int businessSeats;
    private int firstClassSeats;

    private FlightStatus flightStatus;  // ✅ Added manually settable status
}
