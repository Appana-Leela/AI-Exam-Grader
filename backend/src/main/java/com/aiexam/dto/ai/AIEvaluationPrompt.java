package com.aiexam.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIEvaluationPrompt {

    private String question;

    private String expectedAnswer;

    private String evaluationRubric;

    private List<String> keywords;

    private String studentAnswer;

    private Double maximumMarks;

}