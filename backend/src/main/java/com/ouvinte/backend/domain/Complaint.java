package com.ouvinte.backend.domain;

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
    private String decription;
    private String type;
    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] image;
    private double longitude;
    private double latitude;
    private LocalDateTime duration;

    @Override
    public int compareTo(Complaint o) {
        return this.getTitle().compareTo(o.getTitle());
    }
}

