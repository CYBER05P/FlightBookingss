package com.Brinah.FlightBooking.Service;

import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public void notifyAllSubscribers(String subject, String messageBody) {
        List<User> subscribedUsers = userRepository.findBySubscribedToNotificationsTrue();

        for (User user : subscribedUsers) {
            try {
                emailService.sendGenericEmail(user.getEmail(), subject, messageBody);
            } catch (MessagingException e) {
                System.err.println("❌ Failed to email " + user.getEmail() + ": " + e.getMessage());
            }
        }
    }
}
