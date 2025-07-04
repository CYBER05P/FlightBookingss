package com.Brinah.FlightBooking.Repositories;

import com.Brinah.FlightBooking.Entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
