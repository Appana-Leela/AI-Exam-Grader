package com.aiexam.service;

import com.aiexam.entity.RefreshToken;
import com.aiexam.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyRefreshToken(String token);

    void deleteByUserEmail(String email);
}