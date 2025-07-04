package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.ComplaintStatus;
import lombok.Data;

@Data
public class UpdateComplaintStatusRequest {
    private ComplaintStatus status;
    private String adminResponse;
}
