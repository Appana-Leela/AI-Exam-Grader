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
public class AIEvaluationResult {

    private Double suggestedMarks;

    private Double confidence;

    private Double keywordCoverage;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

    private List<String> missingKeywords;

    private String overallFeedback;

}