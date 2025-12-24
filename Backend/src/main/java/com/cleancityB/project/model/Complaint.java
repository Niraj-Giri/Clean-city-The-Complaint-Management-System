package com.cleancityB.project.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    private String area;
    private String address;
    private String category;
    private String description;
    private String urgency;
    private String status; // pending, assigned, in progress, completed

    private byte[] image;


    private byte[] afterImage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // citizen who raised complaint

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @ManyToOne
    @JoinColumn(name = "assigned_employee_id")
    private Employee assignedEmployee; // employee who solves complaint

    @Column(nullable = true, updatable = false)
    private LocalDate date;

    @PrePersist
    protected void onCreate() {
        this.date = LocalDate.now();
    }
    // ===== Getters and Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public byte[] getAfterImage() {
        return afterImage;
    }

    public void setAfterImage(byte[] afterImage) {
        this.afterImage = afterImage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Employee getAssignedEmployee() {
        return assignedEmployee;
    }

    public void setAssignedEmployee(Employee assignedEmployee) {
        this.assignedEmployee = assignedEmployee;
    }
}
//package com.cleancityB.project.model;
//
//import jakarta.persistence.*;
//@Entity
//public class Complaint {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String city;
//    private String area;
//    private String address;
//    private String description;
//    private String urgency;
//    private byte[] image;
//    private byte[] AfterImage;
//    private String status;
//
//
//    public byte[] getAfterImage() {
//        return AfterImage;
//    }
//
//    public void setAfterImage(byte[] afterImage) {
//        AfterImage = afterImage;
//    }
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//    @ManyToOne
//    @JoinColumn(name="assignedTo")
//    private User assignedTo;
//
//    public User getAssignedTo() {
//        return assignedTo;
//    }
//
//    public void setAssignedTo(User assignedTo) {
//        this.assignedTo = assignedTo;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//    public Complaint() {
//
//    }
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id=id;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public String getArea() {
//        return area;
//    }
//
//    public void setArea(String area) {
//        this.area = area;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public byte[] getImage() {
//        return image;
//    }
//
//    public void setImage(byte[] image) {
//        this.image = image;
//    }
//
//    public String getUrgency() {
//        return urgency;
//    }
//
//    public void setUrgency(String urgency) {
//        this.urgency = urgency;
//    }
//}
