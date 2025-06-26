package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
}
