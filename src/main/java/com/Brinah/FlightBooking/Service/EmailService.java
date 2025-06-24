package com.Brinah.FlightBooking.Service;

import com.Brinah.FlightBooking.DTO.BookingDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendBookingReceipt(BookingDto bookingDto, String toEmail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Your Flight Booking Confirmation");

        String qrImage = "<img src='data:image/png;base64," + bookingDto.getQrCodeBase64() + "' width='150' height='150'/>";

        String html = "<h2>Flight Booking Confirmation</h2>" +
                "<p><strong>Confirmation Code:</strong> " + bookingDto.getConfirmationCode() + "</p>" +
                "<p><strong>Name:</strong> " + bookingDto.getName() + "</p>" +
                "<p><strong>ID/Passport:</strong> " + bookingDto.getIdOrPassport() + "</p>" +
                "<p><strong>Flight Number:</strong> " + bookingDto.getFlightNumber() + "</p>" +
                "<p><strong>Departure:</strong> " + bookingDto.getDepartureTime() + "</p>" +
                "<p><strong>Arrival:</strong> " + bookingDto.getArrivalTime() + "</p>" +
                "<p><strong>Seats:</strong> " + String.join(", ", bookingDto.getSeatNumbers()) + "</p>" +
                "<p><strong>Total Price:</strong> $" + bookingDto.getTotalPrice() + "</p>" +
                "<p><strong>QR Code:</strong><br/>" + qrImage + "</p>";

        helper.setText(html, true); // Enable HTML

        mailSender.send(message);
    }
}
