package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.AuthResponse;
import com.Brinah.FlightBooking.DTO.LoginRequest;
import com.Brinah.FlightBooking.DTO.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
