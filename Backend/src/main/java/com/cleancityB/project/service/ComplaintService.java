package com.cleancityB.project.service;

import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.repo.ComplaintRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ComplaintService {
  @Autowired
    ComplaintRepo complaintRepo;
    public void creareComplaint(Complaint complaint) {
        complaintRepo.save(complaint);
    }

    public void updateComplaintStatus(Long id, String newStatus) {
      Complaint complaint = complaintRepo.findById(id);

      complaint.setStatus(newStatus);
      complaintRepo.save(complaint);
    }

}
