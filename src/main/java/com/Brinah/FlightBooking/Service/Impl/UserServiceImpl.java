package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.UserDto;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.Interface.UserService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapperUtil modelMapperUtil;

    @Override
    public UserDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return modelMapperUtil.toUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return modelMapperUtil.toUserDtoList(users);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return modelMapperUtil.toUserDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDto updateProfile(String email, UserDto updatedDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (updatedDto.getName() != null) user.setName(updatedDto.getName());
        if (updatedDto.getCountry() != null) user.setCountry(updatedDto.getCountry());
        if (updatedDto.getDateOfBirth() != null) user.setDateOfBirth(updatedDto.getDateOfBirth());
        if (updatedDto.getIdOrPassportNumber() != null) user.setIdOrPassportNumber(updatedDto.getIdOrPassportNumber());

        User savedUser = userRepository.save(user);
        return modelMapperUtil.toUserDto(savedUser);
    }

    @Override
    public void updateNotificationPreference(Long userId, boolean subscribe) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        user.setSubscribedToNotifications(subscribe);
        userRepository.save(user);
    }
}
