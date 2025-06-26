package com.Brinah.FlightBooking.Service;

import com.Brinah.FlightBooking.DTO.BookingDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendBookingReceipt(BookingDto bookingDto, String toEmail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("✈️ Your Flight Booking Confirmation - " + bookingDto.getConfirmationCode());

        // ✅ Safe QR fallback
        String base64Qr = bookingDto.getQrCodeBase64();
        if (base64Qr == null || base64Qr.trim().isEmpty()) {
            base64Qr = generatePlaceholderQr();
        }

        String qrImage = "<img src='data:image/png;base64," + base64Qr.trim() +
                "' width='150' height='150' style='border:1px solid #ccc;border-radius:8px;'/>";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        String html = "<div style='font-family:Arial,sans-serif;font-size:14px;color:#333;'>"
                + "<h2 style='color:#0a66c2;'>Flight Booking Confirmation</h2>"
                + "<p>Thank you for booking with Brinah Airlines! Here are your booking details:</p>"
                + "<table style='width:100%;border-collapse:collapse;'>"
                + "<tr><td><strong>Confirmation Code:</strong></td><td>" + bookingDto.getConfirmationCode() + "</td></tr>"
                + "<tr><td><strong>Name:</strong></td><td>" + bookingDto.getName() + "</td></tr>"
                + "<tr><td><strong>ID/Passport:</strong></td><td>" + bookingDto.getIdOrPassport() + "</td></tr>"
                + "<tr><td><strong>Flight Number:</strong></td><td>" + bookingDto.getFlightNumber() + "</td></tr>"
                + "<tr><td><strong>Departure Time:</strong></td><td>" + bookingDto.getDepartureTime().format(formatter) + "</td></tr>"
                + "<tr><td><strong>Arrival Time:</strong></td><td>" + bookingDto.getArrivalTime().format(formatter) + "</td></tr>"
                + "<tr><td><strong>Seats:</strong></td><td>" + String.join(", ",
                bookingDto.getSeatNumbers() != null ? bookingDto.getSeatNumbers() : Collections.emptyList()) + "</td></tr>"
                + "<tr><td><strong>Total Price:</strong></td><td>$" + bookingDto.getTotalPrice() + "</td></tr>"
                + "</table>"
                + "<p style='margin-top:20px;'><strong>QR Code:</strong><br/>" + qrImage + "</p>"
                + "<p>Please present this QR code at check-in. Safe travels! 🛫</p>"
                + "</div>";

        // Set both plain text and HTML content
        helper.setText("Flight Booking Confirmation - " + bookingDto.getConfirmationCode(), html);

        mailSender.send(message);
    }

    private String generatePlaceholderQr() {
        // A 1x1 white pixel as a placeholder QR code
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mP8z/C/HwAF/gL+IAho3AAAAABJRU5ErkJggg==";
    }
    // EmailService.java
    public void sendGenericEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true); // true = HTML

        mailSender.send(message);
    }

}
