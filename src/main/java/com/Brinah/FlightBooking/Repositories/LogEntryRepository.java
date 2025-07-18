package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {

    /**
     * Find all log entries by the username who performed the action.
     */
    List<LogEntry> findByUsername(String username);

    /**
     * Find all log entries by the role of the user who performed the action.
     */
    List<LogEntry> findByRole(String role);

    /**
     * Optionally, find log entries by endpoint called.
     */
    List<LogEntry> findByEndpoint(String endpoint);

    /**
     * Optionally, find log entries by action type (e.g., LOGIN, ACCESS_CONTROLLER).
     */
    List<LogEntry> findByAction(String action);
}
