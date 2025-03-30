package com.ouvinte.backend.dto.response;

import com.ouvinte.backend.domain.Complaint;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintResponseDto {
    private Integer id;
    private String title;
    private String description;
    private String type;
    private double longitude;
    private double latitude;
    private LocalDateTime duration;
    private int votes;


    public ComplaintResponseDto(Complaint complaint) {
        this.title = complaint.getTitle();
        this.description = complaint.getDescription();
        this.type = complaint.getType();
        this.longitude = complaint.getLongitude();
        this.latitude = complaint.getLatitude();
        this.duration = complaint.getDuration();
        this.votes = complaint.getVotes();
    }
}
