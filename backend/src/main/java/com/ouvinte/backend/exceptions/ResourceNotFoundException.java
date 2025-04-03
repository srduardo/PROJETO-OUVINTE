package com.ouvinte.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super("Informação não encontrada!");
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
