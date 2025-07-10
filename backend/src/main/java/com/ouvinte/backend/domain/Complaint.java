package com.ouvinte.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private double longitude;
    private double latitude;
    private LocalDateTime duration;
    private int votes;
    @OneToOne(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Image image;

    @Override
    public int compareTo(Complaint o) {
        return this.getTitle().compareTo(o.getTitle());
    }

    public Complaint(ComplaintRequestDto complaintRequestDto, Image image, LocalDateTime duration) {
        this.title = complaintRequestDto.getTitle();
        this.description = complaintRequestDto.getDescription();
        this.type = complaintRequestDto.getType();
        this.longitude = complaintRequestDto.getLongitude();
        this.latitude = complaintRequestDto.getLatitude();
        this.votes = complaintRequestDto.getVotes();
        this.image = image;
        this.duration = duration;
    }
}

