package com.aiexam.dto;

import lombok.Data;

@Data
public class TeacherQuestionEvaluationRequest {

    private String questionId;

    private Double marksAwarded;

    private String remarks;

}