package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.BookingDto;
import com.Brinah.FlightBooking.DTO.BookingRequest;
import com.Brinah.FlightBooking.Entity.Booking;
import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Entity.Seat;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Enum.SeatClass;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.BookingRepository;
import com.Brinah.FlightBooking.Repositories.FlightRepository;
import com.Brinah.FlightBooking.Repositories.SeatRepository;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.EmailService;
import com.Brinah.FlightBooking.Service.Interface.BookingService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtil modelMapper;
    private final EmailService emailService;

    @Transactional
    @Override
    public BookingDto bookFlight(BookingRequest request) {
        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "ID", request.getFlightId()));

        User user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getUserEmail()));

        int totalPassengers = request.getNumberOfAdults() + request.getNumberOfChildren();

        List<Seat> availableSeats = seatRepository.findByFlightIdAndSeatClassAndAvailableTrue(
                flight.getId(), request.getSeatClass()
        );

        if (availableSeats.size() < totalPassengers) {
            throw new IllegalStateException("Not enough available " + request.getSeatClass() + " seats.");
        }

        // Random seat assignment
        Collections.shuffle(availableSeats);
        List<Seat> assignedSeats = availableSeats.subList(0, totalPassengers);

        // Mark seats as unavailable
        assignedSeats.forEach(seat -> seat.setAvailable(false));
        seatRepository.saveAll(assignedSeats);

        // Price calculation
        // Price calculation using flight's pricing config
        double pricePerSeat = switch (request.getSeatClass()) {
            case FIRST -> flight.getFirstClassPrice();
            case BUSINESS -> flight.getBusinessPrice();
            case ECONOMY -> flight.getEconomyPrice();
        };

        double totalPrice = pricePerSeat * totalPassengers;

        // Save booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setSeats(assignedSeats);
        booking.setBookingTime(LocalDateTime.now());
        booking.setConfirmationCode(generateConfirmationCode());
        booking.setTotalPrice(totalPrice);

        Booking savedBooking = bookingRepository.save(booking);

        // Prepare response
        BookingDto dto = modelMapper.toBookingDto(savedBooking);

        // Send email with QR code
        try {
            emailService.sendBookingReceipt(dto, user.getEmail());
        } catch (MessagingException e) {
            System.err.println("Failed to send booking email: " + e.getMessage());
        }

        return dto;
    }

    @Override
    public BookingDto bookFlight(Long flightId, Long seatId, String userEmail) {
        // Deprecated in favor of BookingRequest approach
        return null;
    }
    @Override
    public List<BookingDto> getBookingsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", userId));
        List<Booking> bookings = bookingRepository.findByUser(user);
        return bookings.stream().map(modelMapper::toBookingDto).toList();
    }


    @Override
    @Transactional
    public void cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "ID", bookingId));

        if (!booking.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new IllegalStateException("Unauthorized to cancel this booking.");
        }

        List<Seat> seats = booking.getSeats();
        if (seats != null) {
            seats.forEach(seat -> seat.setAvailable(true));
            seatRepository.saveAll(seats);
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
