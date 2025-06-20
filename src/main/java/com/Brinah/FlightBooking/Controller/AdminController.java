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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/aircraft")
    public ResponseEntity<AircraftDto> addAircraft(@RequestBody AircraftDto dto) {
        return ResponseEntity.ok(adminService.addAircraft(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/airport")
    public ResponseEntity<AirportDto> addAirport(@RequestBody AirportDto dto) {
        return ResponseEntity.ok(adminService.addAirport(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/route")
    public ResponseEntity<RouteDto> addRoute(@RequestBody RouteDto dto) {
        return ResponseEntity.ok(adminService.addRoute(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/aircrafts")
    public ResponseEntity<List<AircraftDto>> getAllAircraft() {
        return ResponseEntity.ok(adminService.getAllAircraft());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/airports")
    public ResponseEntity<List<AirportDto>> getAllAirports() {
        return ResponseEntity.ok(adminService.getAllAirports());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/routes")
    public ResponseEntity<List<RouteDto>> getAllRoutes() {
        return ResponseEntity.ok(adminService.getAllRoutes());
    }
}
