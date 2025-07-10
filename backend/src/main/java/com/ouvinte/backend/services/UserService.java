package com.ouvinte.backend.services;

import com.ouvinte.backend.domain.User;
import com.ouvinte.backend.dto.request.UserRequestDto;
import com.ouvinte.backend.dto.response.UserResponseDto;
import com.ouvinte.backend.exceptions.InvalidCredentialsException;
import com.ouvinte.backend.exceptions.ResourceNotFoundException;
import com.ouvinte.backend.repositories.UserRepository;
import com.ouvinte.backend.services.security.JwtService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoderPassword = new BCryptPasswordEncoder(12); // Instancia o encriptador

    // Interaction operations with databases:

    public List<UserResponseDto> findAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> new UserResponseDto(user))
                .toList();
    }

    public UserResponseDto findUserById(Integer id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        return new UserResponseDto(user);
    }

    
    public UserResponseDto findUserResponseByEmail(String email) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(ResourceNotFoundException::new);

        return new UserResponseDto(user);
    }
    
    public User findUserByEmail(String email) throws ResourceNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(ResourceNotFoundException::new);
    }

    public void deleteUserById(Integer id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        userRepository.delete(user);
    }

    public UserResponseDto updateUserById(Integer id, UserRequestDto userRequestDto) throws ResourceNotFoundException {
        User updatedUser = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        BeanUtils.copyProperties(userRequestDto, updatedUser);
        updatedUser.setPassword(encoderPassword.encode(updatedUser.getPassword()));
        userRepository.save(updatedUser);

        return new UserResponseDto(updatedUser);
    }

    public UserResponseDto updateUserPasswordByEmail(String email, UserRequestDto userRequestDto) throws ResourceNotFoundException {
        User updatedUser = userRepository.findByEmail(email).orElseThrow(ResourceNotFoundException::new);
        updatedUser.setPassword(encoderPassword.encode(userRequestDto.getPassword()));
        userRepository.save(updatedUser);

        return new UserResponseDto(updatedUser);
    }

    // Authentication operations:

    public String verify(UserRequestDto userRequestDto) throws BadCredentialsException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Autenticação inválida");
        }

        System.out.println("Autenticado!!!!");
        return jwtService.generateToken(userRequestDto.getEmail());
    }

    public UserResponseDto registerUser(UserRequestDto userRequestDto) throws RuntimeException{
        if (userRequestDto == null || verifyIfEmailUserExists(userRepository.findAllUserEmails(), userRequestDto)) {
            throw new InvalidCredentialsException();
        }

        User user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        user.setPassword(encoderPassword.encode(user.getPassword())); // Define a senha encriptada no usuário
        User storedUser = userRepository.save(user);

        return new UserResponseDto(storedUser);
    }

    public boolean verifyIfEmailUserExists(List<String> emails, UserRequestDto userRequestDto) {
        Collections.sort(emails);
        return Collections.binarySearch(emails, userRequestDto.getEmail()) > -1;
    }

    public UserDetails getUserEmailFromSecurityContext() {
        if (SecurityContextHolder.getContext() != null && SecurityContextHolder.getContext().getAuthentication() != null) {
            return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }

        return null;
    }

}
