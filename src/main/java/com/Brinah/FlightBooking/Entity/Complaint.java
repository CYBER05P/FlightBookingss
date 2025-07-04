package com.Brinah.FlightBooking.Entity;

import com.Brinah.FlightBooking.Enum.ComplaintStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private String adminResponse;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;
}
