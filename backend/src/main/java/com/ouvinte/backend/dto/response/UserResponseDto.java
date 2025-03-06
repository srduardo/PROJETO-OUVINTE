package com.ouvinte.backend.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserResponseDto {
    @NotBlank
    private Integer id;
    @NotBlank
    @Size(max = 30)
    private String username;
    @NotBlank
    @Email
    @Size(max = 200)
    private String email;

    public UserResponseDto(Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
