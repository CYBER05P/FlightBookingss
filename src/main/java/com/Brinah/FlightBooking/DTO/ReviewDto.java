package com.Brinah.FlightBooking.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
    private Long userId;
    private Long flightId;
}
