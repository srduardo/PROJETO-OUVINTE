package com.ouvinte.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "public_id")
    private String publicId;
    @OneToOne
    @JoinColumn(name = "complaint_id", unique = true)
    @JsonBackReference
    private Complaint complaint;

    public Image(String imageUrl, String publicId, Complaint complaint) {
        this.imageUrl = imageUrl;
        this.publicId = publicId;
        this.complaint = complaint;
    }

    public Image() {

    }
}
