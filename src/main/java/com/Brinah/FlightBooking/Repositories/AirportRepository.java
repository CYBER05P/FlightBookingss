package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository extends JpaRepository<Airport, Long> {}