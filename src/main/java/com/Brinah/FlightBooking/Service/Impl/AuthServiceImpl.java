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
        // Prevent duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Build and save new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .idOrPassportNumber(request.getIdOrPassportNumber())
                .dateOfBirth(request.getDateOfBirth())
                .country(request.getCountry())
                .role(request.getRole() != null ? Role.valueOf(request.getRole().toUpperCase()) : Role.CUSTOMER)
                .enabled(true)
                .subscribedToNotifications(false)
                .build();

        userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // Return full user info in response
        return AuthResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .idOrPassport(user.getIdOrPassportNumber())
                .dateOfBirth(user.getDateOfBirth())
                .country(user.getCountry())
                .role(user.getRole().name())
                .token(token)
                .Message("Registration successful")
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // Authenticate credentials
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // Find user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // Return full user info
        return AuthResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .idOrPassport(user.getIdOrPassportNumber())
                .dateOfBirth(user.getDateOfBirth())
                .country(user.getCountry())
                .role(user.getRole().name())
                .token(token)
                .Message("Login successful")
                .build();
    }
}
