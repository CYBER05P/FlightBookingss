package com.Brinah.FlightBooking.Service;

import com.Brinah.FlightBooking.DTO.BookingDto;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class PDFGeneratorService {

    public byte[] generateTicketPdf(BookingDto booking) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("🎫 Flight Ticket Confirmation").setBold().setFontSize(18).setUnderline());
        document.add(new Paragraph("Confirmation Code: " + booking.getConfirmationCode()));
        document.add(new Paragraph("Name: " + booking.getName()));
        document.add(new Paragraph("ID/Passport: " + booking.getIdOrPassport()));
        document.add(new Paragraph("Flight Number: " + booking.getFlightNumber()));
        document.add(new Paragraph("Departure Time: " + booking.getDepartureTime()));
        document.add(new Paragraph("Arrival Time: " + booking.getArrivalTime()));

        String seats = String.join(", ", booking.getSeatNumbers());
        document.add(new Paragraph("Seats: " + seats));

        String seatClasses = booking.getSeatClasses() != null
                ? String.join(", ", booking.getSeatClasses())
                : "N/A";
        document.add(new Paragraph("Seat Class(es): " + seatClasses));

        document.add(new Paragraph("Total Price: $" + booking.getTotalPrice()));
        document.close();

        return out.toByteArray();
    }
}
