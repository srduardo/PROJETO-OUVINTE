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
                .map(user -> new UserResponseDto(user.getId(), user.getUsername(), user.getEmail()))
                .toList();
    }

    public UserResponseDto findUserById(Integer id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        return new UserResponseDto(user.getId(), user.getUsername(), user.getEmail());
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

        return new UserResponseDto(updatedUser.getId(),updatedUser.getUsername(), updatedUser.getEmail());
    }

    // Authentication operations:

    public String verify(UserRequestDto userRequestDto) throws BadCredentialsException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Autenticação inválida");
        }

        return jwtService.generateToken(userRequestDto.getEmail());
    }

    public void registerUser(UserRequestDto userRequestDto) throws RuntimeException{
        if (userRequestDto == null || verifyIfEmailUserExists(userRepository.findAllUserEmails(), userRequestDto)) {
            throw new InvalidCredentialsException();
        }

        User user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        user.setPassword(encoderPassword.encode(user.getPassword())); // Define a senha encriptada no usuário
        userRepository.save(user);
    }

    public boolean verifyIfEmailUserExists(List<String> emails, UserRequestDto userRequestDto) {
        Collections.sort(emails);
        return Collections.binarySearch(emails, userRequestDto.getEmail()) > -1;
    }
}
