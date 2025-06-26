package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.Entity.LogEntry;
import com.Brinah.FlightBooking.Repositories.LogEntryRepository;
import com.Brinah.FlightBooking.Service.Interface.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService {

    private final LogEntryRepository logEntryRepository;

    @Override
    public void saveLog(LogEntry logEntry) {
        logEntryRepository.save(logEntry);
    }
}
