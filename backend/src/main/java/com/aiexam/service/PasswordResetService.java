package com.aiexam.service;

import com.aiexam.entity.PasswordResetToken;

public interface PasswordResetService {

    PasswordResetToken createPasswordResetToken(String email);

    PasswordResetToken verifyPasswordResetToken(String token);

    void markTokenAsUsed(PasswordResetToken token);

    void deleteToken(PasswordResetToken token);
}