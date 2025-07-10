package com.ouvinte.backend.repositories;

import com.ouvinte.backend.domain.Complaint;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    List<Complaint> findByDurationBefore(LocalDateTime now);
}
