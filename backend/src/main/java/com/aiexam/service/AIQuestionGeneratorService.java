package com.aiexam.service;

import com.aiexam.dto.AIQuestionGenerateRequest;
import com.aiexam.dto.AIQuestionResponse;

public interface AIQuestionGeneratorService {

    AIQuestionResponse generateQuestions(AIQuestionGenerateRequest request);

}