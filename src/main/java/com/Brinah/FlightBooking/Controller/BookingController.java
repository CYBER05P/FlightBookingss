package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.BookRequest;
import com.Brinah.FlightBooking.DTO.BookingDto;
import com.Brinah.FlightBooking.Service.Interface.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Accessible to authenticated users (ROLE_USER and ROLE_ADMIN)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping("/book")
    public ResponseEntity<BookingDto> book(@RequestBody BookRequest request,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.bookFlight(
                request.getFlightId(),
                request.getSeatId(),
                userDetails.getUsername()
        ));
    }


    // Accessible to the booking owner or admins
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable Long id,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        bookingService.cancelBooking(id, userDetails.getUsername());
        return ResponseEntity.ok("Booking cancelled");
    }

    // Accessible only to the logged-in user
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/my")
    public ResponseEntity<List<BookingDto>> myBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getBookingsForUser(userDetails.getUsername()));
    }

    // Accessible only to admins
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<BookingDto>> allBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
