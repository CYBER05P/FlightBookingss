package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.*;
import com.Brinah.FlightBooking.Entity.*;
import com.Brinah.FlightBooking.Enum.ComplaintStatus;
import com.Brinah.FlightBooking.Repositories.*;
import com.Brinah.FlightBooking.Service.EmailService;
import com.Brinah.FlightBooking.Service.Interface.ComplaintService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final ModelMapperUtil modelMapperUtil;
    private final EmailService emailService;

    @Override
    public ComplaintDto createComplaint(CreateComplaintRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Complaint complaint = Complaint.builder()
                .description(request.getDescription())
                .status(ComplaintStatus.OPEN)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return modelMapperUtil.mapComplaintToDto(complaintRepository.save(complaint));
    }

    @Override
    public List<ComplaintDto> getComplaintsByUserId(Long userId) {
        List<Complaint> complaints = complaintRepository.findByUserId(userId);
        return modelMapperUtil.mapComplaintListToDtoList(complaints);
    }

    @Override
    public List<ComplaintDto> getAllComplaints() {
        return modelMapperUtil.mapComplaintListToDtoList(complaintRepository.findAll());
    }

    @Override
    public ComplaintDto updateComplaintStatus(Long id, UpdateComplaintStatusRequest request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(request.getStatus());
        complaint.setAdminResponse(request.getAdminResponse());

        Complaint updatedComplaint = complaintRepository.save(complaint);

        // 📩 Send email notification to user
        sendComplaintResponseEmail(updatedComplaint);

        return modelMapperUtil.mapComplaintToDto(updatedComplaint);
    }

    private void sendComplaintResponseEmail(Complaint complaint) {
        User user = complaint.getUser();
        String to = user.getEmail();
        String subject = "✉️ Response to Your Complaint (ID: " + complaint.getId() + ")";
        String body = "<div style='font-family:Arial,sans-serif;font-size:14px;'>"
                + "<p>Dear " + user.getName() + ",</p>"
                + "<p>Your complaint has been reviewed. Below are the details:</p>"
                + "<table style='border-collapse:collapse;'>"
                + "<tr><td><strong>Complaint:</strong></td><td>" + complaint.getDescription() + "</td></tr>"
                + "<tr><td><strong>Status:</strong></td><td>" + complaint.getStatus() + "</td></tr>"
                + "<tr><td><strong>Admin Response:</strong></td><td>" + complaint.getAdminResponse() + "</td></tr>"
                + "</table>"
                + "<p>Thank you for contacting Brinah Airlines.</p>"
                + "</div>";

        try {
            emailService.sendGenericEmail(to, subject, body);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send complaint response email: " + e.getMessage());
        }
    }

    @Override
    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
}
