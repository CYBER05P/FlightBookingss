package com.Brinah.FlightBooking.Service.Interface;

import com.Brinah.FlightBooking.DTO.CreateReviewRequest;
import com.Brinah.FlightBooking.DTO.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(CreateReviewRequest request);
    List<ReviewDto> getReviewsByFlightId(Long flightId);
    List<ReviewDto> getReviewsByUserId(Long userId);
    void deleteReview(Long id);
}
