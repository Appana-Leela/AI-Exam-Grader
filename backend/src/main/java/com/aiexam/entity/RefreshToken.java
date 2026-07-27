package com.aiexam.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "refresh_tokens")
public class RefreshToken extends BaseEntity {

    private String token;

    private String userEmail;

    private Instant expiryDate;

    @Builder.Default
    private Boolean revoked = false;
}