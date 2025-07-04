package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.DTO.CreateReviewRequest;
import com.Brinah.FlightBooking.DTO.ReviewDto;
import com.Brinah.FlightBooking.Entity.Flight;
import com.Brinah.FlightBooking.Entity.Review;
import com.Brinah.FlightBooking.Entity.User;
import com.Brinah.FlightBooking.Repositories.FlightRepository;
import com.Brinah.FlightBooking.Repositories.ReviewRepository;
import com.Brinah.FlightBooking.Repositories.UserRepository;
import com.Brinah.FlightBooking.Service.Interface.ReviewService;
import com.Brinah.FlightBooking.Utils.ModelMapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final FlightRepository flightRepository;
    private final ModelMapperUtil modelMapperUtil;

    @Override
    public ReviewDto createReview(CreateReviewRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .user(user)
                .flight(flight)
                .build();

        return modelMapperUtil.mapReviewToDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewDto> getReviewsByFlightId(Long flightId) {
        return modelMapperUtil.mapReviewListToDtoList(
                reviewRepository.findByFlightId(flightId)
        );
    }

    @Override
    public List<ReviewDto> getReviewsByUserId(Long userId) {
        return modelMapperUtil.mapReviewListToDtoList(
                reviewRepository.findByUserId(userId)
        );
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
