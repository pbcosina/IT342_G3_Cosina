package com.example.cosina.service;

import com.example.cosina.dto.FundraiseDto;
import com.example.cosina.model.Fundraise;
import com.example.cosina.model.User;
import com.example.cosina.repository.FundraiseRepository;
import com.example.cosina.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FundraiseService {

    private final FundraiseRepository fundraiseRepository;
    private final UserRepository userRepository;

    public FundraiseService(FundraiseRepository fundraiseRepository, UserRepository userRepository) {
        this.fundraiseRepository = fundraiseRepository;
        this.userRepository = userRepository;
    }

    public List<FundraiseDto> getAllPublishedCauses() {
        return fundraiseRepository.findByStatus("PUBLISHED").stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<FundraiseDto> searchPublishedCauses(String search) {
        if (search == null || search.isEmpty()) {
            return getAllPublishedCauses();
        }
        List<FundraiseDto> list = getAllPublishedCauses();
        String lowerSearch = search.toLowerCase();
        return list.stream()
                .filter(f -> (f.getTitle() != null && f.getTitle().toLowerCase().contains(lowerSearch))
                || (f.getCategory() != null && f.getCategory().toLowerCase().contains(lowerSearch)))
                .collect(Collectors.toList());
    }

    public List<FundraiseDto> getMyFundraises(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return fundraiseRepository.findByAuthorId(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public FundraiseDto getCauseDetails(Long id) {
        Fundraise f = fundraiseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fundraise not found"));
        return mapToDto(f);
    }

    public FundraiseDto createFundraise(FundraiseDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Fundraise f = new Fundraise();
        f.setTitle(dto.getTitle());
        f.setStory(dto.getStory());
        f.setCategory(dto.getCategory());
        f.setDonationGoal(dto.getDonationGoal() == null ? BigDecimal.ZERO : dto.getDonationGoal());
        f.setImageUrl(dto.getImageUrl());
        f.setStatus(dto.getStatus() == null ? "DRAFT" : dto.getStatus());
        f.setWhoFor(dto.getWhoFor());
        f.setAuthor(user);
        Fundraise saved = fundraiseRepository.save(f);
        return mapToDto(saved);
    }

    public FundraiseDto updateFundraise(Long id, FundraiseDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Fundraise f = fundraiseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fundraise not found"));
        if (!f.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update");
        }
        f.setTitle(dto.getTitle());
        f.setStory(dto.getStory());
        f.setCategory(dto.getCategory());
        if (dto.getDonationGoal() != null) {
            f.setDonationGoal(dto.getDonationGoal());
        }
        if (dto.getImageUrl() != null) {
            f.setImageUrl(dto.getImageUrl());
        }
        if (dto.getStatus() != null) {
            f.setStatus(dto.getStatus());
        }
        if (dto.getWhoFor() != null) {
            f.setWhoFor(dto.getWhoFor());
        }

        Fundraise saved = fundraiseRepository.save(f);
        return mapToDto(saved);
    }

    public void deleteFundraise(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Fundraise f = fundraiseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fundraise not found"));
        if (!f.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete");
        }
        fundraiseRepository.delete(f);
    }

    public void donateToCause(Long id, BigDecimal amount) {
        Fundraise f = fundraiseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fundraise not found"));
        f.setCurrentDonation(f.getCurrentDonation().add(amount));
        fundraiseRepository.save(f);
    }

    private FundraiseDto mapToDto(Fundraise fundraise) {
        FundraiseDto dto = new FundraiseDto();
        dto.setId(fundraise.getId());
        dto.setTitle(fundraise.getTitle());
        dto.setStory(fundraise.getStory());
        dto.setCategory(fundraise.getCategory());
        dto.setDonationGoal(fundraise.getDonationGoal());
        dto.setCurrentDonation(fundraise.getCurrentDonation());
        dto.setImageUrl(fundraise.getImageUrl());
        dto.setStatus(fundraise.getStatus());
        dto.setWhoFor(fundraise.getWhoFor());
        if (fundraise.getAuthor() != null) {
            dto.setAuthorName(fundraise.getAuthor().getName());
        }
        return dto;
    }
}
