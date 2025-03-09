package com.ouvinte.backend.exceptions;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter;

    public GlobalExceptionHandler(MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter) {
        this.mappingJackson2HttpMessageConverter = mappingJackson2HttpMessageConverter;
    }

    @ExceptionHandler({ InvalidCredentialsException.class })
    public ResponseEntity<ResponseError> handleInvalidCredentialsException(
            Exception ex, WebRequest request) {
        
        return new ResponseEntity<>(
                new ResponseError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<ResponseError> handleAuthenticationException(
            Exception ex, WebRequest request) {

        return new ResponseEntity<ResponseError>(
                new ResponseError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler({ UserNotFoundException.class })
    public ResponseEntity<ResponseError> handleUserNotFoundException(
            Exception ex, WebRequest request) {

        return new ResponseEntity<ResponseError>(
                new ResponseError(HttpStatus.NOT_FOUND.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.NOT_FOUND
        );
    }

}
