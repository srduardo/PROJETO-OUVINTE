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
    public ResponseEntity<String> loginUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.verify(userRequestDto));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.status(201).body(userService.registerUser(userRequestDto));
    }

    // CRUD endpoints:

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserResponseDto> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.findUserResponseByEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponseDto> deleteUserByUsername(@PathVariable Integer id){
        UserResponseDto userRequestDto = userService.findUserById(id);
        userService.deleteUserById(id);
        return ResponseEntity.ok(userRequestDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Integer id, @Valid @RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.updateUserById(id, userRequestDto));
    }
    @PutMapping("/updatePassword/{email}")
    public ResponseEntity<UserResponseDto> updateUserPassword(@PathVariable String email, @Valid @RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.updateUserPasswordByEmail(email, userRequestDto));
    }
}
