package com.aiexam.dto.admin;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAdminExamRequest {

    @NotBlank(message = "Exam code is required")
    private String examCode;

    @NotBlank(message = "Exam name is required")
    private String examName;

    private String description;

    @NotBlank(message = "Course ID is required")
    private String courseId;

    @NotBlank(message = "Course name is required")
    private String courseName;

    @NotBlank(message = "Course code is required")
    private String courseCode;

    @NotBlank(message = "Subject ID is required")
    private String subjectId;

    @NotBlank(message = "Subject name is required")
    private String subjectName;

    @NotBlank(message = "Subject code is required")
    private String subjectCode;

    @NotBlank(message = "Teacher ID is required")
    private String teacherId;

    @NotBlank(message = "Teacher name is required")
    private String teacherName;

    @NotBlank(message = "Teacher email is required")
    private String teacherEmail;

    @NotBlank(message = "Exam type is required")
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