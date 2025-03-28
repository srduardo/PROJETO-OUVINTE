package com.ouvinte.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
//    @NotBlank
//    private MultipartFile image;
    @NotNull
    private double longitude;
    @NotNull
    private double latitude;
}
