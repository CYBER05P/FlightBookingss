package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteRepository extends JpaRepository<Route, Long> {}