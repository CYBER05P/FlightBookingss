package com.Brinah.FlightBooking.Utils;

import com.Brinah.FlightBooking.Entity.Aircraft;
import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Enum.SeatClass;
import com.Brinah.FlightBooking.Entity.Route;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SeatGenerator {

    public static List<Seat> generateSeats(Aircraft aircraft, Flight flight) {
        List<Seat> seats = new ArrayList<>();

        if (flight.getRoute() == null) {
            throw new IllegalArgumentException("Flight route must not be null when generating seats.");
        }

        Route route = flight.getRoute();

        int seatCounter = 1;
        for (int i = 0; i < aircraft.getEconomySeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("E" + seatCounter++)
                    .seatClass(SeatClass.ECONOMY)
                    .available(true)
                    .price(route.getEconomyPrice())
                    .flight(flight)
                    .build());
        }

        seatCounter = 1;
        for (int i = 0; i < aircraft.getBusinessSeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("B" + seatCounter++)
                    .seatClass(SeatClass.BUSINESS)
                    .available(true)
                    .price(route.getBusinessPrice())
                    .flight(flight)
                    .build());
        }

        seatCounter = 1;
        for (int i = 0; i < aircraft.getFirstClassSeats(); i++) {
            seats.add(Seat.builder()
                    .seatNumber("F" + seatCounter++)
                    .seatClass(SeatClass.FIRST)
                    .available(true)
                    .price(route.getFirstClassPrice())
                    .flight(flight)
                    .build());
        }

        return seats;
    }

    public List<Seat> generateSeatsForFlight(Flight savedFlight) {
        if (savedFlight.getRoute() == null || savedFlight.getRoute().getAircraft() == null) {
            throw new IllegalStateException("Cannot generate seats: Flight route or aircraft is null.");
        }

        Aircraft aircraft = savedFlight.getRoute().getAircraft();
        return generateSeats(aircraft, savedFlight);
    }
}
