package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.AuthResponse;
import com.Brinah.FlightBooking.DTO.LoginRequest;
import com.Brinah.FlightBooking.DTO.RegisterRequest;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Enum.Role;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.Interface.AuthService;
import com.Brinah.FlightBooking.Utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .idOrPassportNumber(request.getIdOrPassportNumber())
                .dateOfBirth(request.getDateOfBirth())
                .country(request.getCountry())
                .role(request.getRole() != null ? Role.valueOf(request.getRole().toUpperCase()) : Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .email(user.getEmail())
                .token(token)
                .Message("Registration successful")
                .role(user.getRole().name())
                .build();

    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .name(user.getName())
                .idOrPassport(user.getIdOrPassportNumber())
                .dateOfBirth(user.getDateOfBirth())
                .country(user.getCountry())
                .email(user.getEmail())
                .token(token)
                .Message("Login successful")
                .role(user.getRole().name())
                .build();

    }
}

        