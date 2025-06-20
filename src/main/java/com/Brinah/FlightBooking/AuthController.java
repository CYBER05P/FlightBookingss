//package com.Brinah.FlightBooking;
//
//
//import com.Brinah.FlightBooking.DTO.AuthResponse;
//import com.Brinah.FlightBooking.DTO.LoginRequest;
//import com.Brinah.FlightBooking.DTO.RegisterRequest;
//import com.Brinah.FlightBooking.Service.Interface.AuthService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private final AuthService authService;
//
//    @PostMapping("/register")
//    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
//        return ResponseEntity.ok(authService.register(request));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
//        return ResponseEntity.ok(authService.login(request));
//    }
//}