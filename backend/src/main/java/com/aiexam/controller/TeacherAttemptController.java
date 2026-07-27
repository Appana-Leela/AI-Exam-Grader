package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.dto.TeacherAttemptResponse;
import com.aiexam.dto.TeacherEvaluationRequest;
import com.aiexam.service.ExamAttemptService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherAttemptController {

    private final ExamAttemptService examAttemptService;

    @GetMapping("/exams/{examId}/attempts")
    public ApiResponse<List<TeacherAttemptResponse>> getAttempts(
            @PathVariable String examId) {

        return ApiResponse.<List<TeacherAttemptResponse>>builder()
                .success(true)
                .message("Attempts fetched successfully")
                .data(examAttemptService.getAttemptsByExam(examId))
                .build();
    }

    @Valid
    @PostMapping("/attempts/{attemptId}/evaluate")
public ApiResponse<ExamAttemptResponse> evaluateAttempt(

        @PathVariable String attemptId,

        @RequestBody TeacherEvaluationRequest request

) {

    return ApiResponse.<ExamAttemptResponse>builder()

            .success(true)

            .message("Attempt evaluated successfully")

            .data(
                    examAttemptService.evaluateAttempt(
                            attemptId,
                            request
                    )
            )

            .build();

}
}