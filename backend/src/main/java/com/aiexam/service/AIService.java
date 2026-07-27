package com.aiexam.service;

import com.aiexam.dto.AIEvaluationRequest;
import com.aiexam.dto.AIEvaluationResponse;
import com.aiexam.dto.request.IdealAnswerRequest;
import com.aiexam.dto.response.IdealAnswerResponse;

public interface AIService {

    AIEvaluationResponse evaluateAnswer(
            AIEvaluationRequest request
    );

    IdealAnswerResponse generateIdealAnswer(
            IdealAnswerRequest request
    );

}