package com.example.cosina.repository;

import com.example.cosina.model.Fundraise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundraiseRepository extends JpaRepository<Fundraise, Long> {

    List<Fundraise> findByStatus(String status);

    List<Fundraise> findByStatusAndCategoryContainingIgnoreCase(String status, String category);

    List<Fundraise> findByStatusAndTitleContainingIgnoreCase(String status, String title);

    List<Fundraise> findByAuthorId(Long authorId);
}
