package com.ouvinte.backend.services;

import com.ouvinte.backend.repositories.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ScheduleService {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Scheduled(fixedRate = 900000)
    public void deleteExpiredComplaints() {
        complaintService.findAllComplaints().forEach(complaint -> {
            if (complaint.getDuration().isBefore(LocalDateTime.now())) {
                complaintRepository.deleteById(complaint.getId());
            }
        });
    }
}
