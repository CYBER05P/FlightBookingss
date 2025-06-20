package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.BookingDto;
import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.BookingRepository;
import com.Brinah.FlightBooking.Repositories.FlightRepository;
import com.Brinah.FlightBooking.Repositories.SeatRepository;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.Interface.BookingService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtil modelMapper;

    @Override
    @Transactional
    public BookingDto bookFlight(Long flightId, Long seatId, String userEmail) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", flightId));

        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat", "ID", seatId));

        if (!seat.getAvailable()) {
            throw new ResourceNotFoundException.SeatAlreadyBookedException(seat.getId());
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        seat.setAvailable(false);
        seatRepository.save(seat);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setBookingTime(LocalDateTime.now());
        booking.setConfirmationCode(generateConfirmationCode());

        Booking saved = bookingRepository.save(booking);
        return modelMapper.toBookingDto(saved);
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "ID", bookingId));

        if (!booking.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new IllegalStateException("Unauthorized to cancel this booking.");
        }

        Seat seat = booking.getSeat();
        if (seat != null) {
            seat.setAvailable(true);
            seatRepository.save(seat);
        }

        bookingRepository.deleteById(bookingId);
    }

    @Override
    public List<BookingDto> getBookingsForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        return bookingRepository.findByUser(user)
                .stream()
                .map(modelMapper::toBookingDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(modelMapper::toBookingDto)
                .collect(Collectors.toList());
    }

    private String generateConfirmationCode() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
    }
}
