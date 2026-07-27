package com.aiexam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StartExamRequest {

    @NotBlank(message = "Exam ID is required")
    private String examId;
}