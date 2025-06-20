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
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String confirmationCode;

    @ManyToOne
    private User user;

    @ManyToOne
    private Flight flight;

    @OneToOne
    private Seat seat;

    private LocalDateTime bookingTime;
}
