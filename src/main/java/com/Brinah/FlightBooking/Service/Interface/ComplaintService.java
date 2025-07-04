package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.ComplaintDto;
import com.Brinah.FlightBooking.DTO.CreateComplaintRequest;
import com.Brinah.FlightBooking.DTO.UpdateComplaintStatusRequest;

import java.util.List;

public interface ComplaintService {
    ComplaintDto createComplaint(CreateComplaintRequest request);
    List<ComplaintDto> getComplaintsByUserId(Long userId);
    List<ComplaintDto> getAllComplaints();
    ComplaintDto updateComplaintStatus(Long id, UpdateComplaintStatusRequest request);
    void deleteComplaint(Long id);
}
