package com.aiexam.dto;

import lombok.Data;

import java.util.List;

@Data
public class SaveGeneratedQuestionsRequest {

    private String examId;

    private List<CreateQuestionRequest> questions;

}