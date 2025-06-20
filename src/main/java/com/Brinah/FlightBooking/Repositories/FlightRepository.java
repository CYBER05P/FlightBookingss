package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    @Query("SELECT f FROM Flight f " +
            "JOIN f.departureAirport da " +
            "JOIN f.arrivalAirport aa " +
            "WHERE da.code = :origin AND aa.code = :destination AND CAST(f.departureTime AS date) = :date")
    List<Flight> searchFlights(@Param("origin") String origin,
                               @Param("destination") String destination,
                               @Param("date") LocalDate date);
}