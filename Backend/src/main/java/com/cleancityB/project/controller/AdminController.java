package com.cleancityB.project.controller;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;
import com.cleancityB.project.service.AdminService;
import com.cleancityB.project.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/cleancity/complaints")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private  AdminService adminService;

    @GetMapping("/admin")
    public List<ComplaintDTO> getAllComplaints() {
        return adminService.getAllComplaints();
    }
    @GetMapping("/admin/allemp")
    public List<Employee> getAllEmployee() {
         return adminService.getAllEmployee();
    }
    @GetMapping("admin/{empId}/complaints")
    public List<ComplaintDTO> getAllComplaints(@PathVariable Long empId) {
        return adminService.getAllComplaints(empId);
    }
    @PutMapping("/{compid}/assign")
    public ResponseEntity<String> assignComplaint(@PathVariable Long compid, @RequestBody ComplaintDTO dto) {

         return adminService.assignComplaint(compid, dto);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateComplaintStatus(
            @PathVariable Long id,
            @RequestBody ComplaintDTO dto
    ) {
       return adminService.updateComplaintStatus(id, dto);
    }
    @GetMapping("/status/counts")
    public Map<String, Long> getComplaintCounts() {
    return adminService.getComplaintCounts();
    }

    @GetMapping("admin/complaintsBy/{status}")
public  List<ComplaintDTO> getComplaintsByStatus(@PathVariable String status) {
        return adminService.getComplaintByStatus(status);
    }
}
