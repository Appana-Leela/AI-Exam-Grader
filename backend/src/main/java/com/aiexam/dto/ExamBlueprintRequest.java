package com.aiexam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamBlueprintRequest {

    private String subjectId;

    private Integer totalMarks;

    private Integer totalQuestions;

    private Integer easyQuestions;

    private Integer mediumQuestions;

    private Integer hardQuestions;

    private Integer mcqQuestions;

    private Integer descriptiveQuestions;

    private Integer codingQuestions;
}