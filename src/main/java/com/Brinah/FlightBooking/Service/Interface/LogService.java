package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.Entity.LogEntry;

import java.time.LocalDateTime;
import java.util.List;

public interface LogService {
    void saveLog(LogEntry logEntry);

    List<LogEntry> getAllLogs();

    List<LogEntry> getLogsByUsername(String username);

    List<LogEntry> getLogsByRole(String role);

    // ← Add these two
    List<LogEntry> getLogsByAction(String action);

    List<LogEntry> getLogsBetween(LocalDateTime start, LocalDateTime end);

    void deleteLog(Long id);
}
