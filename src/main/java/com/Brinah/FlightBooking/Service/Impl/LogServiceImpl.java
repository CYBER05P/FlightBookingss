package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.Entity.LogEntry;
import com.Brinah.FlightBooking.Repositories.LogEntryRepository;
import com.Brinah.FlightBooking.Service.Interface.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService {

    private final LogEntryRepository logEntryRepository;

    @Override
    public void saveLog(LogEntry logEntry) {
        logEntryRepository.save(logEntry);
    }

    @Override
    public List<LogEntry> getAllLogs() {
        return logEntryRepository.findAll();
    }

    @Override
    public List<LogEntry> getLogsByUsername(String username) {
        return logEntryRepository.findByUsername(username);
    }

    @Override
    public List<LogEntry> getLogsByRole(String role) {
        return logEntryRepository.findByRole(role);
    }

    @Override
    public List<LogEntry> getLogsByAction(String action) {
        return List.of();
    }

    @Override
    public List<LogEntry> getLogsBetween(LocalDateTime start, LocalDateTime end) {
        return List.of();
    }

    @Override
    public void deleteLog(Long id) {
        logEntryRepository.deleteById(id);
    }
}