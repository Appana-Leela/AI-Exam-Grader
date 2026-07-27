package com.aiexam.service.impl;

import com.aiexam.entity.PasswordResetToken;
import com.aiexam.entity.User;
import com.aiexam.exception.BadRequestException;
import com.aiexam.repository.PasswordResetTokenRepository;
import com.aiexam.repository.UserRepository;
import com.aiexam.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;

    @Override
    public PasswordResetToken createPasswordResetToken(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException("User not found with this email."));

        passwordResetTokenRepository.deleteByEmail(email);

        PasswordResetToken token = PasswordResetToken.builder()
                .token(UUID.randomUUID().toString())
                .email(user.getEmail())
                .expiryDate(
                        Instant.now().plus(15, ChronoUnit.MINUTES)
                )
                .used(false)
                .build();

        return passwordResetTokenRepository.save(token);
    }

    @Override
    public PasswordResetToken verifyPasswordResetToken(String token) {

        PasswordResetToken resetToken =
                passwordResetTokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new BadRequestException("Invalid password reset token."));

        if (resetToken.getUsed()) {
            throw new BadRequestException("Password reset token has already been used.");
        }

        if (resetToken.getExpiryDate().isBefore(Instant.now())) {

            passwordResetTokenRepository.delete(resetToken);

            throw new BadRequestException("Password reset token has expired.");
        }

        return resetToken;
    }

    @Override
    public void markTokenAsUsed(PasswordResetToken token) {

        token.setUsed(true);

        passwordResetTokenRepository.save(token);
    }

    @Override
    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }
}