package com.aiexam.repository;

import com.aiexam.entity.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUserEmail(String userEmail);

    void deleteByUserEmail(String userEmail);
}