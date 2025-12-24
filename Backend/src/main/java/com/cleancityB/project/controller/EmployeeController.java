package com.cleancityB.project.controller;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.ComplaintRepo;
import com.cleancityB.project.repo.UserRepo;
import com.cleancityB.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cleancity/complaints")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;
    @Autowired
    ComplaintRepo complaintRepo;
    @GetMapping("/employee")
   public List<ComplaintDTO> getComplaints(Principal principal) {
        return  employeeService.getComplaints(principal);
    }
    //Employee  set the complaints status
    @PutMapping(path = "/employee/setComplaintStatus",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void setComplaintsStatus(@RequestParam Long complaintId, @RequestParam MultipartFile file) throws IOException {
        System.out.println("Complaint id ------------------- "+complaintId);
       employeeService.setComplaintsStatus(complaintId, file);

    }
    @GetMapping("/employee/status/counts")
    public Map<String,Long> getEmpComplaintsCounts(Principal principal) {
       return employeeService.getEmpComplaintsCounts(principal);
    }


}
