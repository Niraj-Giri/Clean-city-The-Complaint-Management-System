package com.cleancityB.project.controller;

import com.cleancityB.project.Security.Jwtutil;
import com.cleancityB.project.dto.JwtRequest;
import com.cleancityB.project.dto.LoginResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;


@RestController
@RequestMapping("/cleancity")
//@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private Jwtutil jwtUtil;
    private AuthenticationManager authenticationManager;

    public LoginController(Jwtutil jwtUtil, AuthenticationManager authenticationManager) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;

    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody JwtRequest jwtRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token= jwtUtil.generateToken(userDetails.getUsername());
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority) // get the role string
                .findFirst()
                .orElse("ROLE_USER");

        System.out.println(token);
        return ResponseEntity.ok(new LoginResponseDTO(role,token));
    }
}