package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class CreateComplaintRequest {
    private String description;
    private Long userId;
}
