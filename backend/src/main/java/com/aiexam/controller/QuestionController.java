package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;
import com.aiexam.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<QuestionResponse> createQuestion(
            @Valid @RequestBody CreateQuestionRequest request) {
                System.out.println("========== CREATE QUESTION ==========");
                System.out.println("Question Type : " + request.getQuestionType());
                System.out.println("Expected Answer : " + request.getExpectedAnswer());
                System.out.println("=====================================");
        return ApiResponse.<QuestionResponse>builder()
                .success(true)
                .message("Question created successfully")
                .data(questionService.createQuestion(request))
                .build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<QuestionResponse> getQuestionById(
            @PathVariable String id) {

        return ApiResponse.<QuestionResponse>builder()
                .success(true)
                .message("Question fetched successfully")
                .data(questionService.getQuestionById(id))
                .build();
    }

    @GetMapping("/exam/{examId}")
        @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
        public ApiResponse<List<QuestionResponse>> getQuestionsByExam(
                @PathVariable String examId) {

        return ApiResponse.<List<QuestionResponse>>builder()
                .success(true)
                .message("Questions fetched successfully")
                .data(questionService.getQuestionsByExam(examId))
                .build();
        }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<List<QuestionResponse>> getAllQuestions() {

        return ApiResponse.<List<QuestionResponse>>builder()
                .success(true)
                .message("Questions fetched successfully")
                .data(questionService.getAllQuestions())
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<QuestionResponse> updateQuestion(
            @PathVariable String id,
            @Valid @RequestBody UpdateQuestionRequest request) {

        return ApiResponse.<QuestionResponse>builder()
                .success(true)
                .message("Question updated successfully")
                .data(questionService.updateQuestion(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<Void> deleteQuestion(
            @PathVariable String id) {

        questionService.deleteQuestion(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Question deleted successfully")
                .build();
    }

    
}