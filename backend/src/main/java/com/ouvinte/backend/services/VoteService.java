package com.ouvinte.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ouvinte.backend.domain.Complaint;
import com.ouvinte.backend.domain.User;
import com.ouvinte.backend.domain.Vote;
import com.ouvinte.backend.exceptions.ResourceNotFoundException;
import com.ouvinte.backend.repositories.VoteRepository;

@Service
public class VoteService {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private UserService userService;

    @Autowired
    private VoteRepository voteRepository;

    public boolean voteComplaint(Integer id) {
        Complaint complaint = this.complaintService.findComplaintById(id);
        System.out.println("Denúncia encontrada: " + complaint.getId());

        if (userService.getUserEmailFromSecurityContext() == null) {
            throw new ResourceNotFoundException("Usuário não encontrado!");
        }

        User user = userService.findUserByEmail(userService.getUserEmailFromSecurityContext().getUsername());
        System.out.println("Usuário encontrado: " + user.getId());

        if (voteRepository.existsByUserIdAndComplaintId(user.getId(), complaint.getId())) {
            Vote vote = voteRepository.findByUserIdAndComplaintId(user.getId(), complaint.getId());
            voteRepository.delete(vote);
            complaint.setVotes(complaint.getVotes() - 1);
            complaintService.saveComplaint(complaint);
            System.out.println("Voto removido: " + vote.getId());

            return voteRepository.existsByUserIdAndComplaintId(user.getId(), complaint.getId());
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setComplaint(complaint);
        voteRepository.save(vote);
        complaint.setVotes(complaint.getVotes() + 1);
        complaintService.saveComplaint(complaint);
        System.out.println("Voto adicionado: " + vote.getId());

        return voteRepository.existsByUserIdAndComplaintId(user.getId(), complaint.getId());
    }
}
