package com.cleancityB.project.controller;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.User;
import com.cleancityB.project.repo.UserRepo;
import com.cleancityB.project.repo.UserRepo;
import com.cleancityB.project.service.ComplaintService;
import com.cleancityB.project.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/cleancity/complaints")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final UserRepo userRepo;

    public UserController(UserService userService, UserRepo userRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createComplaint(
            @RequestParam String city,
            @RequestParam String area,
            @RequestParam String address,
            @RequestParam String urgency,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam String status,
            Principal principal
    ) {
      return  userService.createComplaint(city,area,address,urgency,category
                ,description,image,status,principal);
    }
    @GetMapping("/user")
    public List<ComplaintDTO> getUserComplaint(Principal principal){
        return userService.getUserComplaint(principal);
    }
    @GetMapping("/user/{id}")
    public ComplaintDTO getUserComplaintById(@PathVariable Long id,Principal principal) {
        return userService.getUserComplaintById(id, principal);
    }

}
