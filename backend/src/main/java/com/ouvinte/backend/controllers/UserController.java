package com.ouvinte.backend.controllers;

import com.ouvinte.backend.domain.User;
import com.ouvinte.backend.dto.UserDto;
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
    public String loginUser(@Valid @RequestBody UserDto userDto) {
        return userService.verify(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.status(201).body(userDto);
    }

    // CRUD endpoints:

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAllUsers();
        return ResponseEntity.status(200).body(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDto> deleteUserByUsername(@PathVariable Integer id){
        UserDto userDto = userService.findUserById(id);
        userService.deleteUserById(id);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id, @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.updateUserById(id, userDto));
    }
}
