package com.cleancityB.project.service;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.ComplaintRepo;
import com.cleancityB.project.repo.UserRepo;
import com.cleancityB.project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {
     @Autowired
     UserRepo userRepo;
     @Autowired
     ComplaintRepo complaintRepo;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public ResponseEntity<String> createComplaint(
            String city,
            String area,
            String address,
            String urgency,
            String category,
            String description,
            MultipartFile image,
            String status,
            Principal principal) {
        try {
            User user = userRepo.findByEmail(principal.getName());

            Complaint complaint = new Complaint();
            complaint.setCity(city);
            complaint.setArea(area);
            complaint.setAddress(address);
            complaint.setUrgency(urgency);
            complaint.setStatus("Pending");
            complaint.setDescription(description);
            if (image != null) {
                complaint.setImage(image.getBytes());
            }
            complaint.setStatus(status);
            complaint.setUser(user);
            complaintRepo.save(complaint);
            return ResponseEntity.ok("Complaint submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    public List<ComplaintDTO> getUserComplaint(Principal principal) {
        User user = userRepo.findByEmail(principal.getName());
        List<Complaint> complaints = complaintRepo.findByUser(user);
        return complaints.stream()
                .map(c -> {
                    ComplaintDTO dto = new ComplaintDTO(
                            c.getId(),
                            c.getCity(),
                            c.getArea(),
                            c.getAddress(),
                            c.getCategory(),
                            c.getDescription(),
                            c.getUrgency(),
                            c.getStatus(),
                            c.getUser().getId(),
                            c.getDate() != null ? c.getDate().format(formatter) : "N/A"

                    );

                    // Include image if present
                    if (c.getImage() != null) {
                        dto.setImageBase64(Base64.getEncoder().encodeToString(c.getImage()));
                    }

                    // Include assigned employee if present
                    if (c.getAssignedEmployee() != null) {
                        dto.setAssignedEmployeeName(c.getAssignedEmployee().getFirstName() + " " + c.getAssignedEmployee().getLastName());

                    }
                    if(c.getAfterImage() != null) {
                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
                    }

                    return dto;
                })
                .toList();
    }

    public ComplaintDTO getUserComplaintById(Long id, Principal principal) {
        User user = userRepo.findByEmail(principal.getName());
        Complaint c=complaintRepo.findById(user.getId());
        ComplaintDTO dto = new ComplaintDTO(
                c.getId(),
                c.getCity(),
                c.getArea(),
                c.getAddress(),
                c.getCategory(),
                c.getDescription(),
                c.getUrgency(),
                c.getStatus(),
                c.getUser().getId(),
                c.getDate() != null ? c.getDate().format(formatter) : "N/A"

        );

        // Include image if present
        if (c.getImage() != null) {
            dto.setImageBase64(Base64.getEncoder().encodeToString(c.getImage()));
        }

        // Include assigned employee if present
        if (c.getAssignedEmployee() != null) {
            dto.setAssignedEmployeeName(c.getAssignedEmployee().getFirstName() + " " + c.getAssignedEmployee().getLastName());

        }
        if(c.getAfterImage() != null) {
            dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
        }

        return dto;

    }
}
