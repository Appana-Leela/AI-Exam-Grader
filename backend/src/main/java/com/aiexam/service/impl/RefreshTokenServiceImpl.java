package com.aiexam.service.impl;

import com.aiexam.entity.RefreshToken;
import com.aiexam.entity.User;
import com.aiexam.exception.BadRequestException;
import com.aiexam.repository.RefreshTokenRepository;
import com.aiexam.security.jwt.JwtService;
import com.aiexam.security.service.CustomUserDetails;
import com.aiexam.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    @Override
    public RefreshToken createRefreshToken(User user) {

        // Remove any previous refresh token for this user
        refreshTokenRepository.deleteByUserEmail(user.getEmail());

        // Generate refresh token using the actual authenticated user
        CustomUserDetails userDetails = new CustomUserDetails(user);

        String token = jwtService.generateRefreshToken(userDetails);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token)
                .userEmail(user.getEmail())
                .expiryDate(
                        Instant.now().plusMillis(refreshExpiration)
                )
                .revoked(false)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new BadRequestException("Refresh token not found."));

        if (refreshToken.getRevoked()) {
            throw new BadRequestException("Refresh token has been revoked.");
        }

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {

            refreshTokenRepository.delete(refreshToken);

            throw new BadRequestException("Refresh token has expired.");
        }

        return refreshToken;
    }

    @Override
    public void deleteByUserEmail(String email) {
        refreshTokenRepository.deleteByUserEmail(email);
    }
}