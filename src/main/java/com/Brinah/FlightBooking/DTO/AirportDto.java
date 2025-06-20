package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class AirportDto {
    private Long id;
    private String name;
    private String code;
    private String city;
    private String country;
}
