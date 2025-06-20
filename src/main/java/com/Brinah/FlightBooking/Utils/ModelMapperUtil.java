package com.Brinah.FlightBooking.Utils;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Entity.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
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
        BookingDto bookingDto = modelMapper.map(booking, BookingDto.class);
        bookingDto.setName(booking.getUser().getName());
        bookingDto.setFlightNumber(booking.getFlight().getFlightNumber());
        bookingDto.setSeatNumber(booking.getSeat().getSeatNumber());
        return bookingDto;
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
}
