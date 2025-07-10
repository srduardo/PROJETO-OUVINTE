package com.ouvinte.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ouvinte.backend.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer>{

}
