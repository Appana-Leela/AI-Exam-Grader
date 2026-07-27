package com.aiexam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SaveAnswerRequest {

    @NotBlank(message = "Question ID is required")
    private String questionId;

    private String selectedOptionId;

    private String descriptiveAnswer;
}