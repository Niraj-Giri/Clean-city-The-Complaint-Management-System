package com.cleancityB.project.service;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.ComplaintRepo;
import com.cleancityB.project.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AdminService {

    ComplaintRepo complaintRepo;

    EmployeeRepo employeeRepo;
    @Autowired
    AdminService(EmployeeRepo employeeRepo, ComplaintRepo complaintRepo) {
        this.employeeRepo = employeeRepo;
        this.complaintRepo = complaintRepo;

    }
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<ComplaintDTO> getAllComplaints() {
        List<Complaint> complaints = complaintRepo.findAll();

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
                    if(c.getAssignedEmployee()!= null) {
                        dto.setAssignedEmployeeId(c.getAssignedEmployee().getEmpId());
                    }
                    if(c.getAfterImage() != null) {
                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
                    }

                    return dto;
                })
                .toList();
    }

    public List<Employee> getAllEmployee() {
        List<Employee> employees=employeeRepo.findAll();
        return employees;
    }
    public ResponseEntity<String> assignComplaint(Long compid,  ComplaintDTO dto) {
        try {
            System.out.println("Complaint ID: " + compid);

            Complaint complaint = complaintRepo.findById(compid);
            if (complaint == null) {
                return ResponseEntity.status(404).body("Complaint not found");
            }

            // Fetch the User by id from UserRepository
            Optional<Employee> employeeOptional= employeeRepo.findByEmpId(dto.getAssignedEmployeeId());
            if (employeeOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            Employee assignedEmp = employeeOptional.get();
            complaint.setAssignedEmployee(assignedEmp);
            complaint.setStatus("Assigned");

            complaintRepo.save(complaint);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Complaint assigned successfully!");
    }

    public ResponseEntity<String> updateComplaintStatus(
           Long id,
           ComplaintDTO dto
    ) {
        try {
            Complaint complaint=complaintRepo.findById(id);
             complaint.setStatus(dto.getStatus());
            return ResponseEntity.ok("Complaint status updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    public Map<String, Long> getComplaintCounts() {
        List<Object[]> results = complaintRepo.countComplaintsByStatus();
        Map<String, Long> counts = new HashMap<>();
        for (Object[] row : results) {
            counts.put((String) row[0], (Long) row[1]);
        }
        return counts;
    }

    public List<ComplaintDTO> getAllComplaints(Long empId){
         Optional<Employee> employee=employeeRepo.findByEmpId(empId);

             List<Complaint> complaintList=complaintRepo.findByAssignedEmployee(employee.get());
             return complaintList.stream()
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
                         if(c.getAssignedEmployee()!= null) {
                             dto.setAssignedEmployeeId(c.getAssignedEmployee().getEmpId());
                         }
                         if(c.getAfterImage() != null) {
                             dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
                         }

                         return dto;
                     })
                     .toList();
         }


    public List<ComplaintDTO> getComplaintByStatus(String status) {

        List<Complaint> complaints=complaintRepo.findByStatus(status);
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
                    if(c.getAssignedEmployee()!= null) {
                        dto.setAssignedEmployeeId(c.getAssignedEmployee().getEmpId());
                    }
                    if(c.getAfterImage() != null) {
                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
                    }

                    return dto;
                })
                .toList();

    }
}
