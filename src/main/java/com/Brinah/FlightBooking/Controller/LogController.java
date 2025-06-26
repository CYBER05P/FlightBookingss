package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.Entity.LogEntry;
import com.Brinah.FlightBooking.Repositories.LogEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/logs")
@RequiredArgsConstructor
public class LogController {

    private final LogEntryRepository logEntryRepository;

    @GetMapping
    @PreAuthorize("hasRole('SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getLogs() {
        return ResponseEntity.ok(logEntryRepository.findAll());
    }
}
