package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.UserDto;
import com.Brinah.FlightBooking.Service.Interface.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/users/{id}/subscribe")
    public ResponseEntity<?> updateNotificationPreference(
            @PathVariable Long id,
            @RequestParam boolean subscribe) {
        userService.updateNotificationPreference(id, subscribe);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserDto updatedDto
    ) {
        String email = userDetails.getUsername(); // gets email from the JWT-authenticated user
        UserDto updatedUser = userService.updateProfile(email, updatedDto);
        return ResponseEntity.ok(updatedUser);
    }
}

