package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.UserDto;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Exception.ResourceNotFoundException;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.Interface.UserService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapperUtil modelMapper;

    @Override
    public UserDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.toUserDto(user);
    }

    @Override
    public UserDto updateProfile(String email, UserDto updatedDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Update only non-null fields (optional safety check)
        if (updatedDto.getName() != null) user.setName(updatedDto.getName());
        if (updatedDto.getCountry() != null) user.setCountry(updatedDto.getCountry());
        if (updatedDto.getDateOfBirth() != null) user.setDateOfBirth(updatedDto.getDateOfBirth());
        if (updatedDto.getIdOrPassportNumber() != null) user.setIdOrPassportNumber(updatedDto.getIdOrPassportNumber());

        User savedUser = userRepository.save(user);
        return modelMapper.toUserDto(savedUser);
    }
}
