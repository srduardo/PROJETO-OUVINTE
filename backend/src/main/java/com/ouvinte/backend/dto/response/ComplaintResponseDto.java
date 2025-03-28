package com.ouvinte.backend.dto.response;

import com.ouvinte.backend.domain.Complaint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintResponseDto {
    @NotBlank
    @Size(max = 50)
    private String title;
    @NotBlank
    @Size(max = 150)
    private String description;
    @NotBlank
    private String type;
    @NotBlank
    private double longitude;
    @NotBlank
    private double latitude;
    @NotBlank
    private LocalDateTime duration;

    public ComplaintResponseDto(Complaint complaint) {
        this.title = complaint.getTitle();
        this.description = complaint.getDescription();
        this.type = complaint.getType();
        this.longitude = complaint.getLongitude();
        this.latitude = complaint.getLatitude();
        this.duration = complaint.getDuration();
    }
}
