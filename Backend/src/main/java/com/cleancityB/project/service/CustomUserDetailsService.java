package com.cleancityB.project.service;

import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;

import com.cleancityB.project.repo.EmployeeRepo;
import com.cleancityB.project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    User user;
    @Autowired
    UserRepo userRepo;
    @Autowired
    EmployeeRepo employeeRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Check user table first
        User user = userRepo.findByEmail(email);
        if (user != null) {
            return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
        }

        // Check employee table
        Employee emp = employeeRepo.findByEmail(email);
        if (emp != null) {
            return new CustomUserDetails(emp.getEmail(), emp.getPassword(), "EMPLOYEE");
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
