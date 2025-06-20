package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.UserDto;

public interface UserService {
    UserDto getProfile(String email);
    UserDto updateProfile(String email, UserDto updatedDto);
}
