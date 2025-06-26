package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.UserDto;

import java.util.List;

public interface UserService {
    UserDto getProfile(String email);
    UserDto updateProfile(String email, UserDto updatedDto);
    void updateNotificationPreference(Long userId, boolean subscribe);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    void deleteUser(Long id);
}
