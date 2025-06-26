package com.Brinah.FlightBooking.Utils;

import com.Brinah.FlightBooking.Entity.Aircraft;
import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SeatGenerator {

    public static List<Seat> generateSeats(Aircraft aircraft, Flight flight) {
        List<Seat> seats = new ArrayList<>();

        int seatCounter = 1;
        for (int i = 0; i < aircraft.getEconomySeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("E" + seatCounter++)
                    .seatClass(SeatClass.ECONOMY)
                    .available(true)
                    .price(flight.getEconomyPrice())
                    .flight(flight)
                    .build());
        }

        seatCounter = 1;
        for (int i = 0; i < aircraft.getBusinessSeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("B" + seatCounter++)
                    .seatClass(SeatClass.BUSINESS)
                    .available(true)
                    .price(flight.getBusinessPrice())
                    .flight(flight)
                    .build());
        }

        seatCounter = 1;
        for (int i = 0; i < aircraft.getFirstClassSeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("F" + seatCounter++)
                    .seatClass(SeatClass.FIRST)
                    .available(true)
                    .price(flight.getFirstClassPrice())
                    .flight(flight)
                    .build());
        }

        return seats;
    }

    public List<Seat> generateSeatsForFlight(Flight savedFlight) {
        Aircraft aircraft = savedFlight.getAircraft();
        if (aircraft == null) {
            throw new IllegalStateException("Cannot generate seats: Aircraft is null.");
        }

        return generateSeats(aircraft, savedFlight);
    }
}
