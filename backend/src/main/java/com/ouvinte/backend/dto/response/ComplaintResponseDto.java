package com.ouvinte.backend.dto.response;

import com.ouvinte.backend.domain.Complaint;
import com.ouvinte.backend.domain.Image;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintResponseDto {
    private Integer id;
    private String title;
    private String description;
    private String type;
    private Image image;
    private double longitude;
    private double latitude;
    private LocalDateTime duration;
    private int votes;
    private boolean isVoted;


    public ComplaintResponseDto(Complaint complaint, boolean isVoted) {
        this.id = complaint.getId();
        this.title = complaint.getTitle();
        this.description = complaint.getDescription();
        this.type = complaint.getType();
        this.image = complaint.getImage();
        this.longitude = complaint.getLongitude();
        this.latitude = complaint.getLatitude();
        this.duration = complaint.getDuration();
        this.votes = complaint.getVotes();
        this.isVoted = isVoted;
    }
}
