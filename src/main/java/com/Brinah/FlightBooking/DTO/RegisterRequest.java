package com.Brinah.FlightBooking.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role;
    private String idOrPassportNumber;
    private LocalDate dateOfBirth;
    private String country;

}
