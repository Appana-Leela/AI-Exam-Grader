package com.aiexam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationAnalyticsResponse {

    private long totalEvaluations;

    private double averageMarks;

    private double averageConfidence;

    private long passedStudents;

    private long failedStudents;

}