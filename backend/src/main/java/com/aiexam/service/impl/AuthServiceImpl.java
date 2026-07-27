package com.aiexam.service.impl;

import com.aiexam.dto.AuthResponse;
import com.aiexam.dto.LoginRequest;
import com.aiexam.dto.RegisterRequest;
import com.aiexam.entity.User;
import com.aiexam.exception.BadRequestException;
import com.aiexam.repository.UserRepository;
import com.aiexam.security.jwt.JwtService;
import com.aiexam.security.service.CustomUserDetails;
import com.aiexam.service.AuthService;
import com.aiexam.service.PasswordResetService;
import com.aiexam.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aiexam.dto.RefreshTokenRequest;
import com.aiexam.entity.RefreshToken;

import com.aiexam.dto.ForgotPasswordRequest;
import com.aiexam.entity.PasswordResetToken;

import com.aiexam.dto.ResetPasswordRequest;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetService passwordResetService;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered.");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .department(request.getDepartment())
                .role(request.getRole())
                .build();

        userRepository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(user);

        return AuthResponse.builder()
                .accessToken(jwtService.generateAccessToken(userDetails))
                .refreshToken(refreshTokenService.createRefreshToken(user).getToken())
                .tokenType("Bearer")
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        CustomUserDetails userDetails = new CustomUserDetails(user);

        return AuthResponse.builder()
                .accessToken(jwtService.generateAccessToken(userDetails))
                .refreshToken(refreshTokenService.createRefreshToken(user).getToken())
                .tokenType("Bearer")
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {

        RefreshToken refreshToken =
                refreshTokenService.verifyRefreshToken(
                        request.getRefreshToken()
                );

        User user = userRepository.findByEmail(refreshToken.getUserEmail())
                .orElseThrow(() ->
                        new BadRequestException("User not found."));

        CustomUserDetails userDetails = new CustomUserDetails(user);

        String accessToken =
                jwtService.generateAccessToken(userDetails);

        return AuthResponse.builder()
                .accessToken(accessToken)

                // Keep the same refresh token until it expires
                .refreshToken(refreshToken.getToken())

                .tokenType("Bearer")

                .email(user.getEmail())

                .firstName(user.getFirstName())

                .lastName(user.getLastName())

                .role(user.getRole())

                .build();
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {

        PasswordResetToken token =
                passwordResetService.createPasswordResetToken(
                        request.getEmail()
                );

        /*
        * Email integration will be enabled next.
        * For now we print the reset link.
        */

        String resetLink =
                "http://localhost:5173/reset-password?token="
                        + token.getToken();

        System.out.println();
        System.out.println("====================================");
        System.out.println("PASSWORD RESET LINK");
        System.out.println(resetLink);
        System.out.println("====================================");
        System.out.println();
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {

        PasswordResetToken token =
                passwordResetService.verifyPasswordResetToken(
                        request.getToken()
                );

        User user = userRepository.findByEmail(token.getEmail())
                .orElseThrow(() ->
                        new BadRequestException("User not found."));

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

        passwordResetService.markTokenAsUsed(token);

        refreshTokenService.deleteByUserEmail(user.getEmail());

    }
}