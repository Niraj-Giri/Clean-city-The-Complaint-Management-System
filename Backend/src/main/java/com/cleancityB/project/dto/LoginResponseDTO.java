package com.cleancityB.project.dto;

public class LoginResponseDTO {
    private String token;
    private String role;

    public LoginResponseDTO(String role, String token) {
        this.role = role;
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
