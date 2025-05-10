package com.ouvinte.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ouvinte.backend.dto.request.ComplaintRequestDto;
import com.ouvinte.backend.dto.response.ComplaintResponseDto;
import com.ouvinte.backend.services.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // CRUD endpoints:

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> getComplaint(@PathVariable Integer id) {
        return ResponseEntity.ok(complaintService.findComplaintById(id));
    }

    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.findAllComplaints());
    }
    @CrossOrigin(origins = "*")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ComplaintResponseDto> registerComplaint(@Valid @RequestPart("datas") String datas, @RequestPart("image") MultipartFile image) throws JsonMappingException, JsonProcessingException {
        ComplaintRequestDto complaintRequestDto = new ObjectMapper().readValue(datas, ComplaintRequestDto.class);
        return ResponseEntity.ok(complaintService.createComplaint(complaintRequestDto, image));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> updateComplaint(@PathVariable Integer id, @Valid @RequestBody ComplaintRequestDto complaintRequestDto) {
        return ResponseEntity.ok(complaintService.updateComplaint(id, complaintRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> deleteComplaint(@PathVariable Integer id) {
        return ResponseEntity.ok(complaintService.deleteComplaint(id));
    }
}
