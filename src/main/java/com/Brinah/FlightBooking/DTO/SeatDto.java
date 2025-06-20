package com.Brinah.FlightBooking.DTO;

import com.Brinah.FlightBooking.Enum.SeatClass;
import lombok.Data;

@Data
public class SeatDto {
    private Long id;
    private String seatNumber;
    private SeatClass seatClass;
    private boolean isAvailable;
}
