package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Repositories.AirportRepository;
import com.Brinah.FlightBooking.Service.Interface.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightService flightService;
    private final AirportRepository airportRepository;

    /**
     * Create a new flight (Admin only).
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FlightDto> createFlight(@RequestBody FlightCreationDto dto) {
        return ResponseEntity.ok(flightService.createFlight(dto));
    }

    /**
     * Get all flights (Admin & Customer).
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping
    public ResponseEntity<List<FlightDto>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    /**
     * Get a flight by ID (Admin & Customer).
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping("/{id:[0-9]+}")
    public ResponseEntity<FlightDto> getFlightById(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    /**
     * Delete a flight (Admin only).
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id:[0-9]+}")
    public ResponseEntity<String> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok("Flight deleted");
    }

    /**
     * Delete all flights (Admin only).
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllFlights() {
        flightService.deleteAllFlights();
        return ResponseEntity.ok("All flights and their bookings have been deleted");
    }

    /**
     * Get all airports for dropdown (no auth required).
     */
    @GetMapping("/dropdown")
    public ResponseEntity<List<AirportDto>> getAirportsForDropdown() {
        List<AirportDto> airports = airportRepository.findAllByOrderByNameAsc()
                .stream()
                .map(a -> new AirportDto())
                .toList();
        return ResponseEntity.ok(airports);
    }

    /**
     * Search available flights (Admin & Customer).
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @PostMapping("/search")
    public ResponseEntity<?> searchFlights(@RequestBody FlightSearchRequest request) {
        List<FlightResponse> results = flightService.searchFlights(request);
        if (results.isEmpty()) {
            return ResponseEntity.ok("No flights available for the given criteria.");
        }
        return ResponseEntity.ok(results);
    }
}
