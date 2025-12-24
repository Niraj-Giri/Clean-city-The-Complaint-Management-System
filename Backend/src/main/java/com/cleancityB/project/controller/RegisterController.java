package com.cleancityB.project.controller;

import com.cleancityB.project.Security.Jwtutil;
import com.cleancityB.project.model.User;
import com.cleancityB.project.service.CustomUserDetailsService;
import com.cleancityB.project.service.LoginRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cleancity")
//@CrossOrigin(origins ="http://localhost:5173")
public class RegisterController {
    @Autowired
    LoginRegisterService  service;
    @Autowired
    CustomUserDetailsService customUserDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    Jwtutil jwtutil;
    @PostMapping("/register")
    public void RegisterUser(@RequestBody User user) {
           service.RegisterUser(user);
    }

}
