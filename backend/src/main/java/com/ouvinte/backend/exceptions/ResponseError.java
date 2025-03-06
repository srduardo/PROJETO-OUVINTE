package com.ouvinte.backend.exceptions;

import java.time.LocalDateTime;

public record ResponseError(int statusCode, String message, LocalDateTime timestamp) {
}
