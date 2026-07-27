package com.aiexam.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnswer {

    private String questionId;

    // MCQ
    private String selectedOptionId;

    // Descriptive
    private String descriptiveAnswer;

    // ===== Teacher Evaluation =====

    @Builder.Default
    private Double marksAwarded = 0.0;

    private String teacherRemarks;

    // ===== AI Evaluation =====

    private String aiFeedback;

    private Double aiSuggestedMarks;

    private Integer aiConfidence;

    private List<String> aiStrengths;

    private List<String> aiWeaknesses;

    private List<String> aiSuggestions;

    @Builder.Default
    private Boolean evaluated = false;

}