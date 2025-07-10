package com.ouvinte.backend.domain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class VoteId implements Serializable{
    @Column(name = "user_id")
    private int userId;

    @Column(name = "complaint_id")
    private int complaintId;

    
}
