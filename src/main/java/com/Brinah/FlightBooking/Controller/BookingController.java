package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.BookingRequest;
import com.Brinah.FlightBooking.DTO.BookingDto;
import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.BookingRepository;
import com.Brinah.FlightBooking.Service.Interface.BookingService;
import com.Brinah.FlightBooking.Service.PDFGeneratorService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    private final BookingRepository bookingRepository;
    private final ModelMapperUtil modelMapper;
    private final PDFGeneratorService pdfGeneratorService;

    // ✅ Book a flight (random seats)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping("/book")
    public ResponseEntity<BookingDto> book(@RequestBody BookingRequest request,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        request.setUserEmail(userDetails.getUsername()); // Inject user email
        BookingDto bookingDto = bookingService.bookFlight(request);
        return ResponseEntity.ok(bookingDto);
    }

    // ✅ Cancel a booking
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable Long id,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        bookingService.cancelBooking(id, userDetails.getUsername());
        return ResponseEntity.ok("Booking cancelled");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDto>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    // ✅ Download ticket PDF
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/download-ticket/{bookingId}")
    public ResponseEntity<byte[]> downloadTicket(@PathVariable Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "ID", bookingId));

        BookingDto dto = modelMapper.toBookingDto(booking);
        byte[] pdfBytes = pdfGeneratorService.generateTicketPdf(dto);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "ticket-" + booking.getConfirmationCode() + ".pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    // ✅ Admin view of all bookings
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<BookingDto>> allBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
