package com.cleancityB.project.dto;

public class ComplaintDTO {

    private Long id;
    private String city;
    private String area;
    private String address;
    private String category;
    private String description;
    private String urgency;
    private String status;
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    private Long userId;           // Citizen who raised the complaint
    private Long assignedEmployeeId; // Employee who is assigned
    private String assignedEmployeeName;

    private String imageBase64;
    private String afterImageBase64;
    private  String date;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
// ===== Constructors =====

    public ComplaintDTO() {}

    public ComplaintDTO(Long id, String city, String area, String address,String category,
                        String description, String urgency, String status,
                        Long userId, Long assignedEmployeeId, String assignedEmployeeName,
                        String imageBase64, String afterImageBase64,String date) {
        this.id = id;
        this.city = city;
        this.area = area;
        this.address = address;
        this.category = category;
        this.description = description;
        this.urgency = urgency;
        this.status = status;
        this.userId = userId;
        this.assignedEmployeeId = assignedEmployeeId;
        this.assignedEmployeeName = assignedEmployeeName;
        this.imageBase64 = imageBase64;
        this.afterImageBase64 = afterImageBase64;
        this.date = date;
    }

    public ComplaintDTO(Long id, String city, String area, String address,String category,
                        String description, String urgency, String status,
                        Long userId,String date) {
        this.id = id;
        this.city = city;
        this.area = area;
        this.address = address;
        this.category = category;
        this.description = description;
        this.urgency = urgency;
        this.status = status;
        this.userId = userId;
        this.date = date;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAssignedEmployeeId() {
        return assignedEmployeeId;
    }

    public void setAssignedEmployeeId(Long assignedEmployeeId) {
        this.assignedEmployeeId = assignedEmployeeId;
    }

    public String getAssignedEmployeeName() {
        return assignedEmployeeName;
    }

    public void setAssignedEmployeeName(String assignedEmployeeName) {
        this.assignedEmployeeName = assignedEmployeeName;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getAfterImageBase64() {
        return afterImageBase64;
    }

    public void setAfterImageBase64(String afterImageBase64) {
        this.afterImageBase64 = afterImageBase64;
    }
}
