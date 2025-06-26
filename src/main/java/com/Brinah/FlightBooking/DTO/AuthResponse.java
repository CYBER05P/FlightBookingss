package com.Brinah.FlightBooking.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String name;
    private String email;
    private String idOrPassport;
    private LocalDate dateOfBirth;
    private String country;
    private String token;
    private String role;
    private  String Message;
}
