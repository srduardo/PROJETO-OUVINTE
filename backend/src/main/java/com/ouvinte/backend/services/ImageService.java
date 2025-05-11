package com.ouvinte.backend.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ouvinte.backend.domain.Image;
import com.ouvinte.backend.repositories.ImageRepository;

@Service
public class ImageService {
    
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;

    public Image uploadImage(MultipartFile image) throws IOException {
        Map uploadedImage = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        
        String imageUrl = (String) uploadedImage.get("secure_url");
        String publicId = (String) uploadedImage.get("public_id");
        
        Image imageToStore = new Image(imageUrl, publicId, null);
        
        return imageToStore;
    }

    public void saveImage(Image image) {
        imageRepository.save(image);
    }
}
