package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String idOrPassportNumber;
    private LocalDate dateOfBirth;
    private String country;
    private Role role;
    private boolean enabled;

    public String getIdOrEmail() {
        if (this.id != null) {
            return String.valueOf(this.id);
        } else {
            return this.email;
        }
    }
}


