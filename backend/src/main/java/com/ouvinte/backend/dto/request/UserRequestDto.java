package com.ouvinte.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDto {
    @Size(max = 30)
    private String username;
    @NotBlank
    @Email
    @Size(max = 200)
    private String email;
    @NotBlank
    @Size(min = 6)
    private String password;
}
