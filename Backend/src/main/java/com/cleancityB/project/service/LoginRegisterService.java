package com.cleancityB.project.service;

import com.cleancityB.project.model.User;

import com.cleancityB.project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginRegisterService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder ;
    public void RegisterUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepo.save(user);

    }
    public ResponseEntity<String> LoginUser(User user) {
        User foundUser = userRepo.findByEmail(user.getEmail());
        if (foundUser != null) {
            System.out.println(foundUser);
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong email or password");
        }
    }
}
