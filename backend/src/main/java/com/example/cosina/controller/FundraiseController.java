package com.example.cosina.controller;

import com.example.cosina.dto.FundraiseDto;
import com.example.cosina.service.FundraiseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/causes")
public class FundraiseController {

    private final FundraiseService fundraiseService;

    public FundraiseController(FundraiseService fundraiseService) {
        this.fundraiseService = fundraiseService;
    }

    @GetMapping
    public ResponseEntity<List<FundraiseDto>> getAllCauses(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(fundraiseService.searchPublishedCauses(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FundraiseDto> getCauseDetails(@PathVariable Long id) {
        return ResponseEntity.ok(fundraiseService.getCauseDetails(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<FundraiseDto>> getMyFundraises(Authentication authentication) {
        return ResponseEntity.ok(fundraiseService.getMyFundraises(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<FundraiseDto> createFundraise(@RequestBody FundraiseDto fundraiseDto, Authentication authentication) {
        return ResponseEntity.ok(fundraiseService.createFundraise(fundraiseDto, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FundraiseDto> updateFundraise(@PathVariable Long id, @RequestBody FundraiseDto fundraiseDto, Authentication authentication) {
        return ResponseEntity.ok(fundraiseService.updateFundraise(id, fundraiseDto, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFundraise(@PathVariable Long id, Authentication authentication) {
        fundraiseService.deleteFundraise(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/donate")
    public ResponseEntity<Void> donate(@PathVariable Long id, @RequestParam BigDecimal amount) {
        fundraiseService.donateToCause(id, amount);
        return ResponseEntity.noContent().build();
    }
}
