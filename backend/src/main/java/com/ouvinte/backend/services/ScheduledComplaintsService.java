package com.ouvinte.backend.services;

import com.ouvinte.backend.repositories.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class ScheduledComplaintsService {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private ComplaintRepository complaintRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedRate = 21600000)
    public void deleteExpiredComplaints() {
        complaintService.findAllComplaints().forEach(complaint -> {
            if (complaint.getDuration().isBefore(LocalDateTime.now())) {
                restTemplate.postForObject(
                        "http://localhost:8080/api/complaints/delete",
                        complaint,
                        Void.class
                );
                complaintRepository.deleteById(complaint.getId());
            }
        });
    }
}
