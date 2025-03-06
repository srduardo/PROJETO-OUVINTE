package com.ouvinte.backend.controllers;

import com.ouvinte.backend.dto.request.UserRequestDto;
import com.ouvinte.backend.dto.response.UserResponseDto;
import com.ouvinte.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Authentication endpoints:

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody UserRequestDto userDto) {
        return ResponseEntity.ok(userService.verify(userDto));
    }

    @PostMapping("/register")
    public ResponseEntity<UserRequestDto> registerUser(@Valid @RequestBody UserRequestDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.status(201).body(userDto);
    }

    // CRUD endpoints:

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponseDto> deleteUserByUsername(@PathVariable Integer id){
        UserResponseDto userDto = userService.findUserById(id);
        userService.deleteUserById(id);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Integer id, @RequestBody UserRequestDto userDto){
        return ResponseEntity.ok(userService.updateUserById(id, userDto));
    }
}
