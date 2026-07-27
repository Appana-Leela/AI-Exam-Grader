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
public class UpdateExamRequest {

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String subject;

    @NotBlank
    private String courseCode;

    @NotNull
    @Min(1)
    private Integer durationInMinutes;

    @NotNull
    @Min(1)
    private Integer totalMarks;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;
}