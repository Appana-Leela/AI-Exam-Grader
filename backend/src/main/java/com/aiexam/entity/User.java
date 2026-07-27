package com.aiexam.entity;

import com.aiexam.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phone;

    private String department;

    // ===== Student Details =====

    private String rollNumber;

    private String year;

    private String section;

    // ===========================

    private Role role;

    @Builder.Default
    private Boolean enabled = true;

    @Builder.Default
    private Boolean deleted = false;

    @Builder.Default
    private Boolean accountLocked = false;

    @Builder.Default
    private Boolean emailVerified = false;

}