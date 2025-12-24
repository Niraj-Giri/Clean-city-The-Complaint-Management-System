package com.cleancityB.project.service;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.ComplaintRepo;
import com.cleancityB.project.repo.EmployeeRepo;
import com.cleancityB.project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

     @Autowired
     EmployeeRepo employeeRepo;
     @Autowired
     ComplaintRepo complaintRepo;
     @Autowired
     UserRepo userRepo;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public List<ComplaintDTO> getComplaints(Principal principal) {
        Employee employee = employeeRepo.findByEmail(principal.getName());
        List<Complaint> complaints = complaintRepo.findByAssignedEmployee(employee);

        return complaints.stream()
                .map(c -> new ComplaintDTO(
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
                ))
                .toList();
    }
    public void setComplaintsStatus( Long complaintId, MultipartFile file) throws IOException {
        System.out.println(complaintId);
        Complaint complaint=complaintRepo.findById(complaintId);
        complaint.setStatus("Completed");
        complaint.setAfterImage(file.getBytes());
        complaintRepo.save(complaint);
        System.out.println(complaint.getAssignedEmployee());

    }
    public Map<String,Long> getEmpComplaintsCounts(Principal principal) {
        Employee employee= employeeRepo.findByEmail(principal.getName());
        List<Object[]> results = complaintRepo.countComplaintsByStatus();
        Map<String, Long> counts = new HashMap<>();
        for (Object[] row : results) {
            counts.put((String) row[0], (Long) row[1]);
            System.out.println(row[0]);
        }
        return counts;
    }
}
