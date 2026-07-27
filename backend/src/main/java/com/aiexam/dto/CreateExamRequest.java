package com.aiexam.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateExamRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Course code is required")
    private String courseCode;

    @NotNull(message = "Duration is required")
    @Min(value = 1)
    private Integer durationInMinutes;

    @NotNull(message = "Total marks is required")
    @Min(value = 1)
    private Integer totalMarks;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;
}