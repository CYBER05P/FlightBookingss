package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.Entity.LogEntry;
import com.Brinah.FlightBooking.Service.Interface.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/logs")
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;

    /** 1️⃣ Get all logs */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    /** 2️⃣ Get logs by username */
    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getByUser(@PathVariable String username) {
        return ResponseEntity.ok(logService.getLogsByUsername(username));
    }

    /** 3️⃣ Get logs by role */
    @GetMapping("/role/{role}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getByRole(@PathVariable String role) {
        return ResponseEntity.ok(logService.getLogsByRole(role));
    }

    /** 4️⃣ Get logs by action type */
    @GetMapping("/action/{action}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getByAction(@PathVariable String action) {
        return ResponseEntity.ok(logService.getLogsByAction(action));
    }

    /** 5️⃣ Get logs in a timestamp range: ?start=2025-07-01T00:00:00&end=2025-07-18T23:59:59 */
    @GetMapping("/range")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<List<LogEntry>> getInRange(
            @RequestParam String start,
            @RequestParam String end) {

        try {
            LocalDateTime from = LocalDateTime.parse(start);
            LocalDateTime to   = LocalDateTime.parse(end);
            return ResponseEntity.ok(logService.getLogsBetween(from, to));
        } catch (DateTimeParseException e) {
            return ResponseEntity
                    .badRequest()
                    .body(List.of()); // or a custom error response
        }
    }

    /** 6️⃣ Delete a log entry by ID */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SUPERADMIN')")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        logService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}
