package com.aiexam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIEvaluationResponse {

    private Double suggestedMarks;

    private Double confidence;

    private String feedback;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

}