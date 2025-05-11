package com.ouvinte.backend.services;

import com.ouvinte.backend.domain.Complaint;
import com.ouvinte.backend.domain.Image;
import com.ouvinte.backend.dto.request.ComplaintRequestDto;
import com.ouvinte.backend.dto.response.ComplaintResponseDto;
import com.ouvinte.backend.exceptions.ResourceNotFoundException;
import com.ouvinte.backend.repositories.ComplaintRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private ImageService imageService;

    public List<ComplaintResponseDto> findAllComplaints() {
        return complaintRepository
                .findAll()
                .stream()
                .map(ComplaintResponseDto::new)
                .toList();
    }

    public ComplaintResponseDto findComplaintById(Integer id) {
        return complaintRepository
                .findById(id)
                .map(ComplaintResponseDto::new)
                .orElseThrow(ResourceNotFoundException::new);
    }

    public ComplaintResponseDto createComplaint(ComplaintRequestDto complaintRequestDto, MultipartFile image) {
        if (complaintRequestDto == null || image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Dados não recebidos!");
        }

        try {
            Image imageToStore = imageService.uploadImage(image);
            
            Complaint complaint = new Complaint(complaintRequestDto, imageToStore, LocalDateTime.now().plusDays(30));            
            Complaint storedComplaint = complaintRepository.save(complaint);
            
            imageToStore.setComplaint(storedComplaint);
            imageService.saveImage(imageToStore);
            
            return new ComplaintResponseDto(complaint);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar denúncia: " + e.getMessage());
        }
    }

    public ComplaintResponseDto updateComplaint(Integer id, ComplaintRequestDto complaintRequestDto) {
        Complaint updatedComplaint = this.complaintRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        BeanUtils.copyProperties(complaintRequestDto, updatedComplaint);
        complaintRepository.save(updatedComplaint);

        return new ComplaintResponseDto(updatedComplaint);
    }

    public ComplaintResponseDto deleteComplaint(Integer id) {
        Complaint complaint = this.complaintRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        ComplaintResponseDto complaintResponseDto = new ComplaintResponseDto(complaint);
        this.complaintRepository.delete(complaint);
        return complaintResponseDto;
    }
}
