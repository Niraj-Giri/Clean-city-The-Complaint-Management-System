package com.cleancityB.project.repo;

import com.cleancityB.project.dto.ComplaintDTO;
import com.cleancityB.project.model.Complaint;
import com.cleancityB.project.model.Employee;
import com.cleancityB.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.util.List;
@Repository
public interface ComplaintRepo extends JpaRepository<Complaint,Integer> {
   public List<Complaint> findByUser(User user);
   public List<Complaint> findByAssignedEmployee(Employee employee);
   public Complaint findById(Long id);

   @Query("SELECT c FROM Complaint c " +
           "LEFT JOIN c.assignedEmployee  a " +
           "WHERE CAST(c.id AS string) LIKE %:keyword% " +  // search by ID
           "OR c.status LIKE %:keyword% " +
           "OR c.urgency LIKE %:keyword% " +
           "OR a.firstName LIKE %:keyword% " +
           "OR c.city LIKE %:keyword% " +
           "OR a.lastName LIKE %:keyword%")
   List<Complaint> searchComplaints(@Param("keyword") String keyword);

   @Query("SELECT c.status, COUNT(c) FROM Complaint c GROUP BY c.status")
   List<Object[]> countComplaintsByStatus();

   @Query("SELECT c.status, COUNT(c) FROM Complaint c WHERE c.assignedEmployee=:employee GROUP BY c.status")
   List<Object[]> countComplaintsByStatus(@Param("employee") Employee employee);


  public  List<Complaint> findByStatus(String status);


}
