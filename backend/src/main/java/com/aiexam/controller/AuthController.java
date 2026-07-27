package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.AuthResponse;
import com.aiexam.dto.LoginRequest;
import com.aiexam.dto.RegisterRequest;
import com.aiexam.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import com.aiexam.dto.RefreshTokenRequest;
import com.aiexam.dto.ForgotPasswordRequest;

import com.aiexam.dto.ResetPasswordRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Registration successful")
                .data(authService.register(request))
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Login successful")
                .data(authService.login(request))
                .build();
    }

    @PostMapping("/refresh-token")
    public ApiResponse<AuthResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        return ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Access token refreshed successfully")
                .data(authService.refreshToken(request))
                .build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<Void> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        authService.forgotPassword(request);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Password reset link generated successfully.")
                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Password reset successful.")
                .build();
    }
}