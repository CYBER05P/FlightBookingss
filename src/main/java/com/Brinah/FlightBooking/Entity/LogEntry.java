package com.Brinah.FlightBooking.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String role;
    private String ipAddress;
    private String action; // e.g., "LOGIN", "ACCESS_CONTROLLER"
    private String endpoint;
    private LocalDateTime timestamp;
}
