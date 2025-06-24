package com.Brinah.FlightBooking.Utils;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Entity.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ModelMapperUtil {

    private final ModelMapper modelMapper;

    public ModelMapperUtil() {
        this.modelMapper = new ModelMapper();
    }

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

        // User Info
        User user = booking.getUser();
        dto.setName(user.getName());
        dto.setIdOrPassport(user.getIdOrPassportNumber());

        // Flight Info
        Flight flight = booking.getFlight();
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());

        // Seat Info
        List<String> seatNumbers = booking.getSeats().stream()
                .map(Seat::getSeatNumber)
                .collect(Collectors.toList());

        List<String> seatClasses = booking.getSeats().stream()
                .map(seat -> seat.getSeatClass().name())
                .collect(Collectors.toList());

        dto.setSeatNumbers(seatNumbers);
        dto.setSeatClasses(seatClasses);

        // Price
        dto.setTotalPrice(booking.getTotalPrice());

        // ✅ QR Code
        String qrText = "Booking Code: " + dto.getConfirmationCode()
                + "\nName: " + dto.getName()
                + "\nID/Passport: " + dto.getIdOrPassport()
                + "\nFlight: " + dto.getFlightNumber()
                + "\nSeats: " + String.join(", ", dto.getSeatNumbers())
                + "\nTotal: $" + dto.getTotalPrice();

        dto.setQrCodeBase64(generateQrCodeImage(qrText));

        return dto;
    }

    public Booking toBookingEntity(BookingDto bookingDto) {
        return modelMapper.map(bookingDto, Booking.class);
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

    public Flight toFlightEntity(FlightDto flightDto) {
        return modelMapper.map(flightDto, Flight.class);
    }

    // ✅ User-Friendly Flight Response
    public FlightResponse toFlightResponse(Flight flight) {
        FlightResponse response = new FlightResponse();


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

    public Seat toSeatEntity(SeatDto seatDto) {
        return modelMapper.map(seatDto, Seat.class);
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
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 200, 200);

            BufferedImage image = MatrixToImageWriter.toBufferedImage(bitMatrix);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            return Base64.getEncoder().encodeToString(baos.toByteArray());
        } catch (Exception e) {
            return null;
        }
    }
}
