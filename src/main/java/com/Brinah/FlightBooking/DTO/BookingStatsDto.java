package com.Brinah.FlightBooking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatsDto {
    private String aircraftModel;
    private Long totalBookings;
}
