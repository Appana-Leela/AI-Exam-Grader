package com.aiexam.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeacherResponse {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String department;

    private Boolean enabled;

    private Boolean deleted;

}