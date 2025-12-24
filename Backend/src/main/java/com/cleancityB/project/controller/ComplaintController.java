package com.cleancityB.project.controller;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.ComplaintRepo;
import com.cleancityB.project.repo.EmployeeRepo;
import com.cleancityB.project.repo.UserRepo;
import com.cleancityB.project.service.ComplaintService;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.security.Principal;

@RestController
@RequestMapping("/cleancity/complaints")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)
public class ComplaintController {

    private final ComplaintRepo complaintRepo;
    private final UserRepo userRepo;
    private final ComplaintService complaintService;
    private  final EmployeeRepo employeeRepo;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    ComplaintController(ComplaintRepo complaintRepo, UserRepo userRepo, ComplaintService complaintService,EmployeeRepo employeeRepo) {
        this.complaintRepo = complaintRepo;
        this.userRepo = userRepo;
        this.complaintService = complaintService;
        this.employeeRepo = employeeRepo;
    }

    // ------------------- Create Complaint -------------------
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<String> createComplaint(
//            @RequestParam String city,
//            @RequestParam String area,
//            @RequestParam String address,
//            @RequestParam String urgency,
//            @RequestParam String category,
//            @RequestParam String description,
//            @RequestParam(required = false) MultipartFile image,
//            @RequestParam String status,
//            Principal principal
//    ) {
//
//
//
//        try {
//            User user = userRepo.findByEmail(principal.getName());
//
//            Complaint complaint = new Complaint();
//            complaint.setCity(city);
//            complaint.setArea(area);
//            complaint.setAddress(address);
//            complaint.setUrgency(urgency);
//            complaint.setStatus("Pending");
//            complaint.setDescription(description); // ✅ was wrongly using category
//            if (image != null) {
//                complaint.setImage(image.getBytes());
//            }
//            complaint.setStatus(status);
//            complaint.setUser(user);
//
//            complaintService.creareComplaint(complaint);
//            return ResponseEntity.ok("Complaint submitted successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error: " + e.getMessage());
//        }
//    }

    // ------------------- Get Complaints (User-specific) -------------------
//    @GetMapping
//    public List<ComplaintDTO> getUserComplaint(Principal principal) {
//        User user = userRepo.findByEmail(principal.getName());
//        List<Complaint> complaints = complaintRepo.findByUser(user);
//        return complaints.stream()
//                .map(c -> {
//                    ComplaintDTO dto = new ComplaintDTO(
//                            c.getId(),
//                            c.getCity(),
//                            c.getArea(),
//                            c.getAddress(),
//                            c.getDescription(),
//                            c.getUrgency(),
//                            c.getStatus(),
//                            c.getUser().getId()
//                    );
//
//                    // Include image if present
//                    if (c.getImage() != null) {
//                        dto.setImageBase64(Base64.getEncoder().encodeToString(c.getImage()));
//                    }
//
//                    // Include assigned employee if present
//                    if (c.getAssignedEmployee() != null) {
//                        dto.setAssignedEmployeeName(c.getAssignedEmployee().getFirstName() + " " + c.getAssignedEmployee().getLastName());
//
//                    }
//                    if(c.getAfterImage() != null) {
//                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
//                    }
//
//                    return dto;
//                })
//                .toList();
//    }

//    // ------------------- Get All Complaints (Admin) -------------------
//    @GetMapping("/admin")
//    public List<ComplaintDTO> getAllComplaints() {
//        List<Complaint> complaints = complaintRepo.findAll();
//        return complaints.stream()
//                .map(c -> {
//                    ComplaintDTO dto = new ComplaintDTO(
//                            c.getId(),
//                            c.getCity(),
//                            c.getArea(),
//                            c.getAddress(),
//                            c.getDescription(),
//                            c.getUrgency(),
//                            c.getStatus(),
//                            c.getUser().getId()
//                    );
//
//                    // Include image if present
//                    if (c.getImage() != null) {
//                        dto.setImageBase64(Base64.getEncoder().encodeToString(c.getImage()));
//                    }
//
//                    // Include assigned employee if present
//                    if (c.getAssignedEmployee() != null) {
//                        dto.setAssignedEmployeeName(c.getAssignedEmployee().getFirstName() + " " + c.getAssignedEmployee().getLastName());
//
//                    }
//                    if(c.getAfterImage() != null) {
//                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
//                    }
//
//                    return dto;
//                })
//                .toList();
//    }

//    @GetMapping("/admin/allemp")
//    public List<User> getAllEmployee() {
//        List<User> user = userRepo.findByRole("EMP");
//        return user;
//    }

//    @PutMapping("/{compid}/assign")
//    public ResponseEntity<String> assignComplaint(@PathVariable int compid, @RequestBody ComplaintDTO dto) {
//        try {
//            System.out.println("Complaint ID: " + compid);
//
//            Complaint complaint = complaintRepo.findById(compid);
//            if (complaint == null) {
//                return ResponseEntity.status(404).body("Complaint not found");
//            }
//
//            // Fetch the User by id from UserRepository
//            Optional<Employee> employeeOptional= employeeRepo.findById(dto.getAssignedEmployeeId());
//            if (employeeOptional.isEmpty()) {
//                return ResponseEntity.status(404).body("User not found");
//            }
//
//           Employee assignedEmp = employeeOptional.get();
//            complaint.setAssignedEmployee(assignedEmp);
//            complaint.setStatus("Assigned");
//
//            complaintRepo.save(complaint);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error: " + e.getMessage());
//        }
//
//        return ResponseEntity.ok("Complaint assigned successfully!");
//    }


    // ------------------- Update Complaint Status -------------------
//    @PutMapping("/{id}/status")
//    public ResponseEntity<String> updateComplaintStatus(
//            @PathVariable int id,
//            @RequestBody ComplaintDTO dto
//    ) {
//        try {
//            complaintService.updateComplaintStatus(id, dto.getStatus());
//            return ResponseEntity.ok("Complaint status updated successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error: " + e.getMessage());
//        }
//    }

    @GetMapping("/filterBy/{keyword}")
    public List<ComplaintDTO> filterByComplaint(@PathVariable String keyword) {
        List<Complaint> complaints = complaintRepo.searchComplaints(keyword);

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
                        dto.setAssignedEmployeeId(c.getAssignedEmployee().getEmpId());
                    }

                    if(c.getAfterImage() != null) {
                        dto.setAfterImageBase64(Base64.getEncoder().encodeToString(c.getAfterImage()));
                    }

                    return dto;
                })
                .toList();


    }
//    //Employee  set the complaints status
//    @PutMapping(path = "/employee/setcomplaintStatus",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//        public void setComplaintsStatus(@RequestParam  int complaintId, @RequestParam MultipartFile file) throws IOException {
//          Complaint complaint=complaintRepo.findById(complaintId);
//          complaint.setStatus("Completed");
//          complaint.setAfterImage(file.getBytes());
//          complaintRepo.save(complaint);
//
//        }
//
//     // Employee getting the  counts of complaints
//
//    @GetMapping("/employee/status/counts")
//    public Map<String,Long> getEmpComplaintsCounts(Principal principal) {
//        User user = userRepo.findByEmail(principal.getName());
//        List<Object[]> results = complaintRepo.countComplaintsByStatus(user);
//        Map<String, Long> counts = new HashMap<>();
//        for (Object[] row : results) {
//            counts.put((String) row[0], (Long) row[1]);
//        }
//        return counts;
//    }
//
//    @GetMapping("/status/counts")
//    public Map<String, Long> getComplaintCounts() {
//        List<Object[]> results = complaintRepo.countComplaintsByStatus();
//        Map<String, Long> counts = new HashMap<>();
//        for (Object[] row : results) {
//            counts.put((String) row[0], (Long) row[1]);
//        }
//        return counts;
//    }


}
