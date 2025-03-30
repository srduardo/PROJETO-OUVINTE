package com.ouvinte.backend.domain;

import com.ouvinte.backend.dto.request.ComplaintRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "complaints")
public class Complaint implements Comparable<Complaint> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String type;
    private byte[] image;
    private double longitude;
    private double latitude;
    private LocalDateTime duration;
    private int votes;

    @Override
    public int compareTo(Complaint o) {
        return this.getTitle().compareTo(o.getTitle());
    }

    public Complaint(ComplaintRequestDto complaintRequestDto) {
        this.title = complaintRequestDto.getTitle();
        this.description = complaintRequestDto.getDescription();
        this.type = complaintRequestDto.getType();
        this.longitude = complaintRequestDto.getLongitude();
        this.latitude = complaintRequestDto.getLatitude();
        this.votes = complaintRequestDto.getVotes();
    }
}

