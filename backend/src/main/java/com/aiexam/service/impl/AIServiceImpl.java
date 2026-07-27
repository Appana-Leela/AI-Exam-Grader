package com.aiexam.service.impl;

import com.aiexam.client.FastApiClient;
import com.aiexam.dto.AIEvaluationRequest;
import com.aiexam.dto.AIEvaluationResponse;
import com.aiexam.dto.request.IdealAnswerRequest;
import com.aiexam.dto.response.IdealAnswerResponse;
import com.aiexam.service.AIService;
import org.springframework.stereotype.Service;

@Service
public class AIServiceImpl implements AIService {

    private final FastApiClient fastApiClient;

    public AIServiceImpl(FastApiClient fastApiClient) {
        this.fastApiClient = fastApiClient;
    }

    @Override
    public AIEvaluationResponse evaluateAnswer(
            AIEvaluationRequest request
    ) {
        return fastApiClient.evaluateAnswer(request);
    }

    @Override
    public IdealAnswerResponse generateIdealAnswer(
            IdealAnswerRequest request
    ) {
        return fastApiClient.generateIdealAnswer(
                request.getQuestion()
        );
    }

}