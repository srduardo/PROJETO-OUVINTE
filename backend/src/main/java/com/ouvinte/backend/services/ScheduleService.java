package com.ouvinte.backend.services;

import com.ouvinte.backend.domain.Complaint;
import com.ouvinte.backend.repositories.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Scheduled(fixedRate = 900000) 
    public void deleteExpiredComplaints() {
        List<Complaint> complaints = complaintRepository.findByDurationBefore(LocalDateTime.now());
        complaintRepository.deleteAll(complaints);
    }
}
