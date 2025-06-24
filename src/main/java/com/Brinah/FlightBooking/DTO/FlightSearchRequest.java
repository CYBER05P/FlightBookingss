package com.Brinah.FlightBooking.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class FlightSearchRequest {
    private String from; // can be code, city, or country
    private String to;   // can be code, city, or country

    @JsonFormat(pattern = "yyyy-MM-dd") // ✅ ensures correct parsing from JSON
    private LocalDate date;
}
