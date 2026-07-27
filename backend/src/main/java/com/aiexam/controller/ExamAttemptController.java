package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.dto.SaveAnswerRequest;
import com.aiexam.dto.StartExamRequest;
import com.aiexam.dto.TeacherEvaluationRequest;
import com.aiexam.service.ExamAttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class ExamAttemptController {

    private final ExamAttemptService examAttemptService;

    @PostMapping("/start")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<ExamAttemptResponse> startExam(
            @Valid @RequestBody StartExamRequest request) {

        return ApiResponse.<ExamAttemptResponse>builder()
                .success(true)
                .message("Exam started successfully")
                .data(examAttemptService.startExam(request))
                .build();
    }

    @PutMapping("/{attemptId}/answer")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<ExamAttemptResponse> saveAnswer(
            @PathVariable String attemptId,
            @Valid @RequestBody SaveAnswerRequest request) {

        return ApiResponse.<ExamAttemptResponse>builder()
                .success(true)
                .message("Answer saved successfully")
                .data(examAttemptService.saveAnswer(attemptId, request))
                .build();
    }

    @PutMapping("/{attemptId}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<ExamAttemptResponse> submitExam(
            @PathVariable String attemptId) {

        return ApiResponse.<ExamAttemptResponse>builder()
                .success(true)
                .message("Exam submitted successfully")
                .data(examAttemptService.submitExam(attemptId))
                .build();
    }

    @PutMapping("/{attemptId}/evaluate")
        @PreAuthorize("hasRole('TEACHER')")
        public ApiResponse<ExamAttemptResponse> evaluateAttempt(
                @PathVariable String attemptId,
                @Valid @RequestBody TeacherEvaluationRequest request) {

        return ApiResponse.<ExamAttemptResponse>builder()
                .success(true)
                .message("Attempt evaluated successfully.")
                .data(examAttemptService.evaluateAttempt(attemptId, request))
                .build();
        }

    @GetMapping("/{attemptId}")
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER','ADMIN')")
    public ApiResponse<ExamAttemptResponse> getAttempt(
            @PathVariable String attemptId) {

        return ApiResponse.<ExamAttemptResponse>builder()
                .success(true)
                .message("Attempt fetched successfully")
                .data(examAttemptService.getAttempt(attemptId))
                .build();
    }

    

}