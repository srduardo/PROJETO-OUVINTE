package com.ouvinte.backend.repositories;

import com.ouvinte.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT email FROM users", nativeQuery = true)
    List<String> findAllUserEmails();
}
