package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Service.Interface.AdminService;
import com.Brinah.FlightBooking.Service.Interface.FlightService;
import com.Brinah.FlightBooking.Service.Interface.UserService;
import com.Brinah.FlightBooking.Service.NotificationService;
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
    private final UserService userService;
    private final NotificationService notificationService;
    private final FlightService flightService;

    // ===== Aircraft Endpoints =====

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/aircrafts")
    public ResponseEntity<AircraftDto> addAircraft(@RequestBody AircraftDto dto) {
        return ResponseEntity.ok(adminService.addAircraft(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/aircrafts/bulk")
    public ResponseEntity<List<AircraftDto>> addMultipleAircrafts(@RequestBody List<AircraftDto> aircraftDtos) {
        List<AircraftDto> saved = aircraftDtos.stream()
                .map(adminService::addAircraft)
                .toList();
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/aircrafts")
    public ResponseEntity<List<AircraftDto>> getAllAircraft() {
        return ResponseEntity.ok(adminService.getAllAircraft());
    }

    // ===== Airport Endpoints =====

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/airports")
    public ResponseEntity<AirportDto> addAirport(@RequestBody AirportDto dto) {
        return ResponseEntity.ok(adminService.addAirport(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/airports/bulk")
    public ResponseEntity<List<AirportDto>> addMultipleAirports(@RequestBody List<AirportDto> airportDtos) {
        List<AirportDto> saved = airportDtos.stream()
                .map(adminService::addAirport)
                .toList();
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/airports")
    public ResponseEntity<List<AirportDto>> getAllAirports() {
        return ResponseEntity.ok(adminService.getAllAirports());
    }

    // ===== Notification Endpoint =====

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/notify")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
        notificationService.notifyAllSubscribers(request.getSubject(), request.getMessage());
        return ResponseEntity.ok("✅ Notifications sent to all subscribed users.");
    }

    // ===== User Management (ADMIN only) =====

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("✅ User deleted successfully.");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/flight-stats")
    public ResponseEntity<List<FlightStatsDto>> getFlightStats() {
        return ResponseEntity.ok(flightService.getFlightStatistics());
    }

}
