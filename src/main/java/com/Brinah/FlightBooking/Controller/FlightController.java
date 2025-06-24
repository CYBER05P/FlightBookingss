package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.FlightDto;
import com.Brinah.FlightBooking.DTO.FlightResponse;
import com.Brinah.FlightBooking.DTO.FlightSearchRequest;
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FlightDto> create(@RequestBody FlightDto dto) {
        return ResponseEntity.ok(flightService.createFlight(dto));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping
    public ResponseEntity<List<FlightDto>> getAll() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping("/{id:[0-9]+}") // ✅ restricts to numeric IDs only
    public ResponseEntity<FlightDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id:[0-9]+}") // ✅ same for delete
    public ResponseEntity<String> delete(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok("Flight deleted");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @PostMapping("/search") // ✅ works now — no ambiguity with {id}
    public ResponseEntity<?> searchFlights(@RequestBody FlightSearchRequest request) {
        List<FlightResponse> results = flightService.searchFlights(request);
        if (results.isEmpty()) {
            return ResponseEntity.ok("No flights available for the given criteria.");
        }
        return ResponseEntity.ok(results);
    }
}
