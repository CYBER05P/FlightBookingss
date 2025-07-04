package com.Brinah.FlightBooking.Service.Impl;

import com.Brinah.FlightBooking.Entity.Promotion;
import com.Brinah.FlightBooking.Repositories.PromotionRepository;
import com.Brinah.FlightBooking.Service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;

    @Override
    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    @Override
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion getPromotionById(Long id) {
        return promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with ID: " + id));
    }

    @Override
    public Promotion updatePromotion(Long id, Promotion promotion) {
        Promotion existing = getPromotionById(id);
        existing.setCode(promotion.getCode());
        existing.setDescription(promotion.getDescription());
        existing.setDiscountPercentage(promotion.getDiscountPercentage());
        existing.setValidUntil(promotion.getValidUntil());
        return promotionRepository.save(existing);
    }

    @Override
    public void deletePromotion(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new RuntimeException("Promotion not found");
        }
        promotionRepository.deleteById(id);
    }

    @Override
    public List<Promotion> importPromotions(List<Promotion> promotions) {
        return promotionRepository.saveAll(promotions);
    }
}
