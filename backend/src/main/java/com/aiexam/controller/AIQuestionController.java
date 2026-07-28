package com.aiexam.controller;

import com.aiexam.dto.AIQuestionGenerateRequest;
import com.aiexam.dto.AIQuestionResponse;
import com.aiexam.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIQuestionController {

    private final AIService aiService;

    @PostMapping("/questions/generate")
    public ResponseEntity<AIQuestionResponse> generateQuestions(
            @RequestBody AIQuestionGenerateRequest request
    ) {

        return ResponseEntity.ok(
                aiService.generateQuestions(request)
        );

    }


    

}