package com.Brinah.FlightBooking.Entity;
import com.Brinah.FlightBooking.Enum.SeatClass;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    private SeatClass seatClass;

    @Column(name = "is_available")
    private Boolean available;

    @ManyToOne
    private Flight flight;
}