package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {

    // ✅ Used when creating a flight to avoid duplicates
    Optional<Airport> findByNameAndCityAndCountry(String name, String city, String country);

    // ✅ For dropdowns — get all sorted if needed
    List<Airport> findAllByOrderByNameAsc();
}
