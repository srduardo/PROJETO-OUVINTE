package com.ouvinte.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ComplaintRequestDto {
    @NotBlank
    @Size(max = 50)
    private String title;
    @NotBlank
    @Size(max = 150)
    private String description;
    @NotBlank
    private String type;
    @NotNull
    private double longitude;
    @NotNull
    private double latitude;
    @NotNull
    private int votes;
}
