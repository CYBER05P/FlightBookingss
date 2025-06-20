package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.FlightDto;
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
    @GetMapping("/{id}")
    public ResponseEntity<FlightDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok("Flight deleted");
    }
}
