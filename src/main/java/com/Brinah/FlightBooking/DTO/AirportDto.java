package com.Brinah.FlightBooking.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AirportDto {
    private Long id;
    private String name;
    private String code;
    private String city;
    private String country;
}
