package com.ouvinte.backend.dto.response;

import com.ouvinte.backend.domain.User;
import lombok.Data;

@Data
public class UserResponseDto {
    private Integer id;
    private String username;
    private String email;

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
