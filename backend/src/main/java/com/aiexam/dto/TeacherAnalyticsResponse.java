package com.aiexam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAnalyticsResponse {

    private Long totalExams;

    private Long publishedExams;

    private Long totalAttempts;

    private Double averageMarks;

    private Double passPercentage;

    private Double failPercentage;

}