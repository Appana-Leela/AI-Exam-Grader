package com.aiexam.dto.ai;

import lombok.Data;

import java.util.List;

@Data
public class AIEvaluationResponse {

    private Double suggestedMarks;

    private String feedback;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

    private Integer confidence;

    private String modelAnswer;

}