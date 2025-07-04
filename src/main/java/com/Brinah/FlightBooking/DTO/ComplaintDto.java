package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.ComplaintStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComplaintDto {
    private Long id;
    private String description;
    private ComplaintStatus status;
    private String adminResponse;
    private LocalDateTime createdAt;
    private Long userId;
}
