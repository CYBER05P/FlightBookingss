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
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("✈️ Your Flight Booking Confirmation - " + bookingDto.getConfirmationCode());

        // ✅ Ensure QR Code base64 is valid and trimmed
        String base64Qr = bookingDto.getQrCodeBase64();
        if (base64Qr == null || base64Qr.isBlank()) {
            base64Qr = generatePlaceholderQr(); // fallback if needed
        }

        String qrImage = "<img src='data:image/png;base64," + base64Qr.trim() + "' width='150' height='150' style='border:1px solid #ccc;'/>";

        // ✅ HTML Content with table and inline CSS
        String html = "<div style='font-family:Arial,sans-serif;font-size:14px;color:#333;'>"
                + "<h2 style='color:#0a66c2;'>Flight Booking Confirmation</h2>"
                + "<p>Thank you for booking with Brinah Airlines! Here are your details:</p>"
                + "<table style='width:100%;border-collapse:collapse;'>"
                + "<tr><td><strong>Confirmation Code:</strong></td><td>" + bookingDto.getConfirmationCode() + "</td></tr>"
                + "<tr><td><strong>Name:</strong></td><td>" + bookingDto.getName() + "</td></tr>"
                + "<tr><td><strong>ID/Passport:</strong></td><td>" + bookingDto.getIdOrPassport() + "</td></tr>"
                + "<tr><td><strong>Flight Number:</strong></td><td>" + bookingDto.getFlightNumber() + "</td></tr>"
                + "<tr><td><strong>Departure Time:</strong></td><td>" + bookingDto.getDepartureTime() + "</td></tr>"
                + "<tr><td><strong>Arrival Time:</strong></td><td>" + bookingDto.getArrivalTime() + "</td></tr>"
                + "<tr><td><strong>Seats:</strong></td><td>" + String.join(", ", bookingDto.getSeatNumbers()) + "</td></tr>"
                + "<tr><td><strong>Total Price:</strong></td><td>$" + bookingDto.getTotalPrice() + "</td></tr>"
                + "</table>"
                + "<p style='margin-top:20px;'><strong>QR Code:</strong><br/>" + qrImage + "</p>"
                + "<p>Show this QR code at check-in. Safe travels! 🛫</p>"
                + "</div>";

        helper.setText("Flight Booking Confirmation: " + bookingDto.getConfirmationCode(), html);

        mailSender.send(message);
    }

    // Optional fallback QR
    private String generatePlaceholderQr() {
        // A 1x1 white pixel in base64
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mP8z/C/HwAF/gL+IAho3AAAAABJRU5ErkJggg==";
    }
}
