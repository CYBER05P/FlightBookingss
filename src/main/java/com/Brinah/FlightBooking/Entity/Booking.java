package com.Brinah.FlightBooking.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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

    // ✅ Multiple assigned seats
    @OneToMany
    private List<Seat> seats;

    private LocalDateTime bookingTime;

    @Column(name = "total_price")
    private Double totalPrice;

}
