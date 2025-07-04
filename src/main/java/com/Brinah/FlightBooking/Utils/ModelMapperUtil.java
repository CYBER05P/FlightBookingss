package com.Brinah.FlightBooking.Utils;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Entity.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ModelMapperUtil {

    private final ModelMapper modelMapper = new ModelMapper();

    // === User Mapping ===
    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User toUserEntity(UserDto dto) {
        return modelMapper.map(dto, User.class);
    }

    public List<UserDto> toUserDtoList(List<User> users) {
        return users.stream().map(this::toUserDto).collect(Collectors.toList());
    }

    // === Booking Mapping ===
    public BookingDto toBookingDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setConfirmationCode(booking.getConfirmationCode());
        dto.setBookingTime(booking.getBookingTime());

        User user = booking.getUser();
        if (user != null) {
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setIdOrPassport(user.getIdOrPassportNumber());
            dto.setCountry(user.getCountry());
            dto.setDateOfBirth(user.getDateOfBirth());
        }

        Flight flight = booking.getFlight();
        if (flight != null) {
            dto.setFlightNumber(flight.getFlightNumber());
            dto.setDepartureTime(flight.getDepartureTime());
            dto.setArrivalTime(flight.getArrivalTime());
        }

        List<Seat> seats = booking.getSeats();
        if (seats != null) {
            dto.setSeatNumbers(seats.stream().map(Seat::getSeatNumber).collect(Collectors.toList()));
            dto.setSeatClasses(seats.stream().map(seat -> seat.getSeatClass().name()).collect(Collectors.toList()));
        }

        dto.setTotalPrice(Optional.ofNullable(booking.getTotalPrice()).orElse(0.0));

        String qrText = "Booking Code: " + dto.getConfirmationCode()
                + "\nName: " + dto.getName()
                + "\nID/Passport: " + dto.getIdOrPassport()
                + "\nFlight: " + dto.getFlightNumber()
                + "\nSeats: " + String.join(", ", dto.getSeatNumbers())
                + "\nTotal: $" + dto.getTotalPrice();

        dto.setQrCodeBase64(generateQrCodeImage(qrText));
        return dto;
    }

    public Booking toBookingEntity(BookingDto dto) {
        return modelMapper.map(dto, Booking.class);
    }

    // === Flight Mapping ===
    public FlightDto toFlightDto(Flight flight) {
        FlightDto dto = modelMapper.map(flight, FlightDto.class);
        if (flight.getAircraft() != null) {
            dto.setAircraftId(flight.getAircraft().getId());
        }
        return dto;
    }

    public Flight toFlightEntity(FlightDto dto) {
        return modelMapper.map(dto, Flight.class);
    }

    public FlightResponse toFlightResponse(Flight flight) {
        FlightResponse response = new FlightResponse();
        response.setFlightId(flight.getId());
        response.setFlightNumber(flight.getFlightNumber());

        if (flight.getDepartureAirport() != null) {
            response.setDepartureAirportCode(flight.getDepartureAirport().getCode());
            response.setDepartureAirportName(flight.getDepartureAirport().getName());
            response.setDepartureCity(flight.getDepartureAirport().getCity());
            response.setDepartureCountry(flight.getDepartureAirport().getCountry());
        }

        if (flight.getArrivalAirport() != null) {
            response.setArrivalAirportCode(flight.getArrivalAirport().getCode());
            response.setArrivalAirportName(flight.getArrivalAirport().getName());
            response.setArrivalCity(flight.getArrivalAirport().getCity());
            response.setArrivalCountry(flight.getArrivalAirport().getCountry());
        }

        response.setDepartureTime(flight.getDepartureTime());
        response.setArrivalTime(flight.getArrivalTime());
        response.setAircraftModel(flight.getAircraft().getModel());

        response.setEconomyPrice(flight.getEconomyPrice());
        response.setBusinessPrice(flight.getBusinessPrice());
        response.setFirstClassPrice(flight.getFirstClassPrice());
        response.setFlightStatus(flight.getStatus().name());

        return response;
    }

    // === Seat Mapping ===
    public SeatDto toSeatDto(Seat seat) {
        return modelMapper.map(seat, SeatDto.class);
    }

    public Seat toSeatEntity(SeatDto dto) {
        return modelMapper.map(dto, Seat.class);
    }

    // === Aircraft Mapping ===
    public AircraftDto toAircraftDto(Aircraft aircraft) {
        return modelMapper.map(aircraft, AircraftDto.class);
    }

    public Aircraft toAircraftEntity(AircraftDto dto) {
        return modelMapper.map(dto, Aircraft.class);
    }

    // === Airport Mapping ===
    public AirportDto toAirportDto(Airport airport) {
        return modelMapper.map(airport, AirportDto.class);
    }

    public Airport toAirportEntity(AirportDto dto) {
        return modelMapper.map(dto, Airport.class);
    }

    // === Review Mapping ===
    public ReviewDto mapReviewToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setUserId(review.getUser().getId());
        dto.setFlightId(review.getFlight().getId());
        return dto;
    }

    public List<ReviewDto> mapReviewListToDtoList(List<Review> reviews) {
        return reviews.stream().map(this::mapReviewToDto).collect(Collectors.toList());
    }

    // === Complaint Mapping ===
    public ComplaintDto mapComplaintToDto(Complaint complaint) {
        ComplaintDto dto = new ComplaintDto();
        dto.setId(complaint.getId());
        dto.setDescription(complaint.getDescription());
        dto.setStatus(complaint.getStatus());
        dto.setAdminResponse(complaint.getAdminResponse());
        dto.setCreatedAt(complaint.getCreatedAt());
        dto.setUserId(complaint.getUser().getId());
        return dto;
    }

    public List<ComplaintDto> mapComplaintListToDtoList(List<Complaint> complaints) {
        return complaints.stream().map(this::mapComplaintToDto).collect(Collectors.toList());
    }

    // === QR Code Generator ===
    private String generateQrCodeImage(String text) {
        try {
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(text, BarcodeFormat.QR_CODE, 200, 200);
            BufferedImage image = MatrixToImageWriter.toBufferedImage(matrix);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            return Base64.getEncoder().encodeToString(baos.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
