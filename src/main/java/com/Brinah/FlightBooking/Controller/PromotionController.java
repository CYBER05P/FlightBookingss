package com.Brinah.FlightBooking.Controller;

import com.Brinah.FlightBooking.Entity.Promotion;
import com.Brinah.FlightBooking.Service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping("/create")
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        return new ResponseEntity<>(promotionService.createPromotion(promotion), HttpStatus.CREATED);
    }

    @PostMapping("/import")
    public ResponseEntity<List<Promotion>> importPromotions(@RequestBody List<Promotion> promotions) {
        return new ResponseEntity<>(promotionService.importPromotions(promotions), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        return new ResponseEntity<>(promotionService.getAllPromotions(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable Long id) {
        return new ResponseEntity<>(promotionService.getPromotionById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        return new ResponseEntity<>(promotionService.updatePromotion(id, promotion), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
