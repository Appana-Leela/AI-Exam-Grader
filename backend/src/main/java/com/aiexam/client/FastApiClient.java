package com.aiexam.client;

import com.aiexam.dto.AIEvaluationRequest;
import com.aiexam.dto.AIEvaluationResponse;
import com.aiexam.dto.response.IdealAnswerResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import com.aiexam.dto.AIQuestionGenerateRequest;
import com.aiexam.dto.AIQuestionResponse;
@Component
public class FastApiClient {

    private final RestClient restClient;

    public FastApiClient(
            @Value("${ai.service.url}") String aiServiceUrl
    ) {
        this.restClient = RestClient.builder()
                .baseUrl(aiServiceUrl)
                .build();
    }

    public AIEvaluationResponse evaluateAnswer(
            AIEvaluationRequest request
    ) {

        return restClient.post()
                .uri("/evaluate")
                .body(request)
                .retrieve()
                .body(AIEvaluationResponse.class);

    }

    public IdealAnswerResponse generateIdealAnswer(
            String question
    ) {

        return restClient.post()
                .uri("/generate-ideal-answer")
                .body(
                        java.util.Map.of(
                                "question",
                                question
                        )
                )
                .retrieve()
                .body(IdealAnswerResponse.class);

    }

    public AIQuestionResponse generateQuestions(
        AIQuestionGenerateRequest request
        ) {

        return restClient.post()
                .uri("/generate-questions")
                .body(request)
                .retrieve()
                .body(AIQuestionResponse.class);

        }

}