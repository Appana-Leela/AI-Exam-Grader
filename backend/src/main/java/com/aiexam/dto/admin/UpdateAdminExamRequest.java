package com.aiexam.dto.admin;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateAdminExamRequest {

    @NotBlank
    private String examName;

    private String description;

    @NotBlank
    private String courseId;

    @NotBlank
    private String courseName;

    @NotBlank
    private String courseCode;

    @NotBlank
    private String subjectId;

    @NotBlank
    private String subjectName;

    @NotBlank
    private String subjectCode;

    @NotBlank
    private String teacherId;

    @NotBlank
    private String teacherName;

    @NotBlank
    private String teacherEmail;

    @NotBlank
    private String examType;

    @NotNull
    @Min(1)
    private Integer semester;

    private String section;

    @NotBlank
    private String academicYear;

    @NotNull
    @Min(1)
    private Integer durationInMinutes;

    @NotNull
    @Min(1)
    private Integer totalMarks;

    @NotNull
    @Min(0)
    private Integer passingMarks;

    @Future
    private LocalDateTime startTime;

    @Future
    private LocalDateTime endTime;

    private String instructions;
}