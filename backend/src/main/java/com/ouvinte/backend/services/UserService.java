package com.ouvinte.backend.services;

import com.ouvinte.backend.domain.User;
import com.ouvinte.backend.dto.request.UserRequestDto;
import com.ouvinte.backend.dto.response.UserResponseDto;
import com.ouvinte.backend.exceptions.InvalidCredentialsException;
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
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoderPassword = new BCryptPasswordEncoder(12); // Instancia o encriptador

    // Interaction operations with databases:

    public List<UserResponseDto> findAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> new UserResponseDto(user.getId(), user.getUsername(), user.getEmail()))
                .toList();
    }

    public UserResponseDto findUserById(Integer id) throws RuntimeException {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado.");
        }

        return new UserResponseDto(user.get().getId(), user.get().getUsername(), user.get().getEmail());
    }

    public void deleteUserById(Integer id) throws RuntimeException {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado.");
        }

        userRepository.delete(user.get());
    }

    public UserResponseDto updateUserById(Integer id, UserRequestDto userDto) throws RuntimeException {
        Optional<User> oldUser = userRepository.findById(id);

        if (oldUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        User updatedUser = oldUser.get();
        BeanUtils.copyProperties(userDto, updatedUser);
        updatedUser.setPassword(encoderPassword.encode(updatedUser.getPassword()));
        userRepository.save(updatedUser);

        return new UserResponseDto(updatedUser.getId(),updatedUser.getUsername(), updatedUser.getEmail());
    }

    // Authentication operations:

    public String verify(UserRequestDto userDto) throws BadCredentialsException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Autenticação inválida");
        }

        return jwtService.generateToken(userDto.getEmail());
    }

    public void registerUser(UserRequestDto userDto) throws RuntimeException{
        if (userDto == null || verifyIfEmailUserExists(userRepository.findAllUserEmails(), userDto)) {
            throw new InvalidCredentialsException();
        }

        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        user.setPassword(encoderPassword.encode(user.getPassword())); // Define a senha encriptada no usuário
        userRepository.save(user);
    }

    public boolean verifyIfEmailUserExists(List<String> emails, UserRequestDto userDto) {
        Collections.sort(emails);
        return Collections.binarySearch(emails, userDto.getEmail()) > -1;
    }
}
