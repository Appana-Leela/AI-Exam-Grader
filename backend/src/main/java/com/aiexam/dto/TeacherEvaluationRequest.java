package com.aiexam.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeacherEvaluationRequest {

    private List<TeacherQuestionEvaluationRequest> evaluations;

}