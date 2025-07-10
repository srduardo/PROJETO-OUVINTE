package com.ouvinte.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ouvinte.backend.domain.Vote;
import com.ouvinte.backend.domain.VoteId;

@Repository
public interface VoteRepository extends JpaRepository<Vote, VoteId> {
    List<Vote> findByUserId(Integer userId);
    List<Vote> findByComplaintId(Integer complaintId);
    Vote findByUserIdAndComplaintId(Integer userId, Integer complaintId);

    boolean existsByUserIdAndComplaintId(Integer userId, Integer complaintId);
    
}
