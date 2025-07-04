package com.Brinah.FlightBooking.DTO;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private int rating;
    private String comment;
    private Long userId;
    private Long flightId;
}
