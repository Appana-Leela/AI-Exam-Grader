package com.aiexam.service;

import com.aiexam.dto.AuthResponse;
import com.aiexam.dto.ForgotPasswordRequest;
import com.aiexam.dto.LoginRequest;
import com.aiexam.dto.RefreshTokenRequest;
import com.aiexam.dto.RegisterRequest;
import com.aiexam.dto.ResetPasswordRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    void forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);

}