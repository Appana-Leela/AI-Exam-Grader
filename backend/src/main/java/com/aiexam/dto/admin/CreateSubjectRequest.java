package com.aiexam.dto.admin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateSubjectRequest {

    @NotBlank(message = "Subject code is required.")
    private String subjectCode;

    @NotBlank(message = "Subject name is required.")
    private String subjectName;

    private String description;

    @NotNull(message = "Credits are required.")
    @Min(value = 1, message = "Credits must be at least 1.")
    private Integer credits;

    @NotNull(message = "Semester is required.")
    @Min(value = 1, message = "Semester must be at least 1.")
    private Integer semester;

    @NotBlank(message = "Course is required.")
    private String courseId;

}