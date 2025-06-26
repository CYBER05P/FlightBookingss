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

    // === User ===
    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public User toUserEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    // === Booking ===
    public BookingDto toBookingDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setConfirmationCode(booking.getConfirmationCode());
        dto.setBookingTime(booking.getBookingTime());

        // User Info
        User user = booking.getUser();
        if (user != null) {
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setIdOrPassport(user.getIdOrPassportNumber());
            dto.setCountry(user.getCountry());
            dto.setDateOfBirth(user.getDateOfBirth());
        }

        // Flight Info
        Flight flight = booking.getFlight();
        if (flight != null) {
            dto.setFlightNumber(flight.getFlightNumber());
            dto.setDepartureTime(flight.getDepartureTime());
            dto.setArrivalTime(flight.getArrivalTime());
        }

        // Seats
        List<Seat> seats = booking.getSeats();
        if (seats != null) {
            dto.setSeatNumbers(seats.stream()
                    .map(Seat::getSeatNumber)
                    .collect(Collectors.toList()));

            dto.setSeatClasses(seats.stream()
                    .map(seat -> seat.getSeatClass().name())
                    .collect(Collectors.toList()));
        }

        dto.setTotalPrice(Optional.ofNullable(booking.getTotalPrice()).orElse(0.0));

        // QR Code generation
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

    // === Flight ===
    public FlightDto toFlightDto(Flight flight) {
        FlightDto flightDto = modelMapper.map(flight, FlightDto.class);
        if (flight.getAircraft() != null) {
            flightDto.setAircraftId(flight.getAircraft().getId());
        }
        if (flight.getRoute() != null) {
            flightDto.setRouteId(flight.getRoute().getId());
        }
        return flightDto;
    }

    public Flight toFlightEntity(FlightDto dto) {
        return modelMapper.map(dto, Flight.class);
    }

    // === Friendly Flight View ===
    public FlightResponse toFlightResponse(Flight flight) {
        FlightResponse response = new FlightResponse();

        response.setFlightId(flight.getId());
        response.setFlightNumber(flight.getFlightNumber());

        response.setDepartureAirportCode(flight.getDepartureAirport().getCode());
        response.setDepartureAirportName(flight.getDepartureAirport().getName());
        response.setDepartureCity(flight.getDepartureAirport().getCity());
        response.setDepartureCountry(flight.getDepartureAirport().getCountry());
        response.setDepartureTime(flight.getDepartureTime());

        response.setArrivalAirportCode(flight.getArrivalAirport().getCode());
        response.setArrivalAirportName(flight.getArrivalAirport().getName());
        response.setArrivalCity(flight.getArrivalAirport().getCity());
        response.setArrivalCountry(flight.getArrivalAirport().getCountry());
        response.setArrivalTime(flight.getArrivalTime());

        response.setAircraftModel(flight.getAircraft().getModel());

        response.setEconomyPrice(flight.getRoute().getEconomyPrice());
        response.setBusinessPrice(flight.getRoute().getBusinessPrice());
        response.setFirstClassPrice(flight.getRoute().getFirstClassPrice());

        response.setFlightStatus(flight.getStatus().name());

        return response;
    }

    // === Seat ===
    public SeatDto toSeatDto(Seat seat) {
        return modelMapper.map(seat, SeatDto.class);
    }

    public Seat toSeatEntity(SeatDto dto) {
        return modelMapper.map(dto, Seat.class);
    }

    // === Aircraft ===
    public AircraftDto toAircraftDto(Aircraft aircraft) {
        return modelMapper.map(aircraft, AircraftDto.class);
    }

    public Aircraft toAircraftEntity(AircraftDto dto) {
        return modelMapper.map(dto, Aircraft.class);
    }

    // === Airport ===
    public AirportDto toAirportDto(Airport airport) {
        return modelMapper.map(airport, AirportDto.class);
    }

    public Airport toAirportEntity(AirportDto dto) {
        return modelMapper.map(dto, Airport.class);
    }

    // === Route ===
    public RouteDto toRouteDto(Route route) {
        return modelMapper.map(route, RouteDto.class);
    }

    public Route toRouteEntity(RouteDto dto) {
        return modelMapper.map(dto, Route.class);
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
