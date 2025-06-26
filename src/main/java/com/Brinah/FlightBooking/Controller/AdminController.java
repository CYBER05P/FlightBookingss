package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.AircraftDto;
import com.Brinah.FlightBooking.DTO.AirportDto;
import com.Brinah.FlightBooking.DTO.RouteDto;
import com.Brinah.FlightBooking.Service.Interface.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ===== Aircraft Endpoints =====

    /**
     * Add a single aircraft.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/aircrafts")
    public ResponseEntity<AircraftDto> addAircraft(@RequestBody AircraftDto dto) {
        return ResponseEntity.ok(adminService.addAircraft(dto));
    }

    /**
     * Add multiple aircrafts in bulk.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/aircrafts/bulk")
    public ResponseEntity<List<AircraftDto>> addMultipleAircrafts(@RequestBody List<AircraftDto> aircraftDtos) {
        List<AircraftDto> saved = aircraftDtos.stream()
                .map(adminService::addAircraft)
                .toList();
        return ResponseEntity.ok(saved);
    }

    /**
     * Retrieve all aircrafts.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/aircrafts")
    public ResponseEntity<List<AircraftDto>> getAllAircraft() {
        return ResponseEntity.ok(adminService.getAllAircraft());
    }

    // ===== Airport Endpoints =====

    /**
     * Add a single airport.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/airports")
    public ResponseEntity<AirportDto> addAirport(@RequestBody AirportDto dto) {
        return ResponseEntity.ok(adminService.addAirport(dto));
    }

    /**
     * Add multiple airports in bulk.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/airports/bulk")
    public ResponseEntity<List<AirportDto>> addMultipleAirports(@RequestBody List<AirportDto> airportDtos) {
        List<AirportDto> saved = airportDtos.stream()
                .map(adminService::addAirport)
                .toList();
        return ResponseEntity.ok(saved);
    }

    /**
     * Retrieve all airports.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/airports")
    public ResponseEntity<List<AirportDto>> getAllAirports() {
        return ResponseEntity.ok(adminService.getAllAirports());
    }

    // ===== Route Endpoints =====

    /**
     * Add a route (must assign an aircraft).
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/routes")
    public ResponseEntity<RouteDto> addRoute(@RequestBody RouteDto dto) {
        return ResponseEntity.ok(adminService.addRoute(dto));
    }

    /**
     * Retrieve all routes.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/routes")
    public ResponseEntity<List<RouteDto>> getAllRoutes() {
        return ResponseEntity.ok(adminService.getAllRoutes());
    }
}
