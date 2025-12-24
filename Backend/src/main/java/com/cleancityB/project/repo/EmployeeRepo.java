package com.cleancityB.project.repo;

import com.cleancityB.project.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    public List<Employee> findAll();
    public Employee findByEmail(String email);
    public Optional<Employee> findByEmpId(Long empId);
}
