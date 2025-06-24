package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Enum.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    @Query("SELECT f FROM Flight f " +
            "JOIN f.departureAirport da " +
            "JOIN f.arrivalAirport aa " +
            "WHERE (:from IS NULL OR da.code = :from OR da.city = :from OR da.country = :from) " +
            "AND (:to IS NULL OR aa.code = :to OR aa.city = :to OR aa.country = :to) " +
            "AND CAST(f.departureTime AS date) = :date " +
            "AND f.status = :status " +
            "AND f.departureTime > CURRENT_TIMESTAMP " +
            "AND EXISTS (SELECT s FROM Seat s WHERE s.flight = f AND s.available = true)")
    List<Flight> structuredSearch(
            @Param("from") String from,
            @Param("to") String to,
            @Param("date") LocalDate date,
            @Param("status") FlightStatus status
    );
}