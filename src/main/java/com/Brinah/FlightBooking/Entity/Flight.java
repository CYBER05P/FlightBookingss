package com.Brinah.FlightBooking.Entity;

import com.Brinah.FlightBooking.Enum.FlightStatus;
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
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightNumber;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    private Double economyPrice;

    private Double businessPrice;

    private Double firstClassPrice;



    @ManyToOne
    private Aircraft aircraft;

    @ManyToOne
    private Airport departureAirport;

    @ManyToOne
    private Airport arrivalAirport;


    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = FlightStatus.ACTIVE;
        }
    }


    @Enumerated(EnumType.STRING)
    private FlightStatus status; // <-- ADDED FIELD

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;
}
