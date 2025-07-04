package com.Brinah.FlightBooking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // ✅ This is what enables the constructor (long, long, long)
public class FlightStatisticsDto {
    private long totalFlights;
    private long activeFlights;
    private long completedFlights;
}


