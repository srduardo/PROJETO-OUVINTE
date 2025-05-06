package com.ouvinte.backend.services;

import com.ouvinte.backend.domain.Complaint;
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
        if (image.isEmpty() || complaintRequestDto == null) {
            throw new IllegalArgumentException("Dados não recebidos!");
        }

        try {
            Complaint complaint = new Complaint(complaintRequestDto);
            complaint.setImage(image.getBytes());
            complaint.setDuration(LocalDateTime.now().plusDays(30));

            complaintRepository.save(complaint);

            return new ComplaintResponseDto(complaint);
        } catch (Exception e) {
            throw new IllegalArgumentException("Não foi possível processar a denúncia!");
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
