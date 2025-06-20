package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {}
