package com.ouvinte.backend.services.security;

import com.ouvinte.backend.domain.User;
import com.ouvinte.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MainUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            System.out.println("Usuário não encontrado");
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        return new MainUserDetails(user);
    }

}
