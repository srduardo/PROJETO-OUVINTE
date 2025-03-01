package com.ouvinte.backend.exceptions;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class ErrorResponse {
    private int statusCode;
    private String message;
    private LocalDateTime timestamp;
}
