package com.aiexam.mapper;

import com.aiexam.dto.admin.TeacherResponse;
import com.aiexam.entity.User;
import org.springframework.stereotype.Component;

@Component
public class TeacherMapper {

    public TeacherResponse toResponse(User user){

        return TeacherResponse.builder()

                .id(user.getId())

                .firstName(user.getFirstName())

                .lastName(user.getLastName())

                .email(user.getEmail())

                .phone(user.getPhone())

                .department(user.getDepartment())

                .enabled(user.getEnabled())

                .build();

    }

}