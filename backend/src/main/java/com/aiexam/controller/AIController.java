package com.aiexam.controller;

import com.aiexam.dto.AIEvaluationRequest;
import com.aiexam.dto.AIEvaluationResponse;
import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.request.IdealAnswerRequest;
import com.aiexam.dto.response.IdealAnswerResponse;
import com.aiexam.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class AIController {

    private final AIService aiService;

    @PostMapping("/evaluate")
    public ApiResponse<AIEvaluationResponse> evaluate(
            @RequestBody AIEvaluationRequest request) {

        return ApiResponse.<AIEvaluationResponse>builder()
                .success(true)
                .message("AI evaluation completed.")
                .data(aiService.evaluateAnswer(request))
                .build();
    }

    @PostMapping("/ideal-answer")
    public ApiResponse<IdealAnswerResponse> generateIdealAnswer(
            @RequestBody IdealAnswerRequest request) {

        return ApiResponse.<IdealAnswerResponse>builder()
                .success(true)
                .message("Ideal answer generated successfully.")
                .data(aiService.generateIdealAnswer(request))
                .build();
    }
}