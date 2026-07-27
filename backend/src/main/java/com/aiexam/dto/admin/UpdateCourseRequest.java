package com.aiexam.dto.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCourseRequest {

    @NotBlank(message = "Course code is required.")
    private String courseCode;

    @NotBlank(message = "Course name is required.")
    private String courseName;

    private String description;

    @NotBlank(message = "Duration is required.")
    private String duration;

    private Boolean enabled;

}