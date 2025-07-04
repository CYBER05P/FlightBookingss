package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.DTO.*;

import com.Brinah.FlightBooking.Service.Interface.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    public ResponseEntity<ComplaintDto> createComplaint(@RequestBody CreateComplaintRequest request) {
        return ResponseEntity.ok(complaintService.createComplaint(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ComplaintDto>> getComplaintsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(complaintService.getComplaintsByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<ComplaintDto>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComplaintDto> updateStatus(@PathVariable Long id,
                                                     @RequestBody UpdateComplaintStatusRequest request) {
        return ResponseEntity.ok(complaintService.updateComplaintStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok("Complaint deleted");
    }
}
