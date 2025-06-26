package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
    Optional<Aircraft> findByModel(String aircraftModel);
}
