package com.cleancityB.project.repo;

import com.cleancityB.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

   public User findByEmail(String email);
   public List<User> findByRole(String role);
   public User findById(long id);


}
