package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.dto.ExamResponse;
import com.aiexam.dto.StudentDashboardResponse;
import com.aiexam.service.ExamAttemptService;
import com.aiexam.service.ExamService;
import com.aiexam.service.StudentDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final ExamService examService;
    private final ExamAttemptService examAttemptService;
    private final StudentDashboardService studentDashboardService;

    @GetMapping("/dashboard")
    public ApiResponse<StudentDashboardResponse> getDashboard() {

        return ApiResponse.<StudentDashboardResponse>builder()
                .success(true)
                .message("Dashboard fetched successfully.")
                .data(studentDashboardService.getDashboard())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/exams")
    public ApiResponse<List<ExamResponse>> getAvailableExams() {

        return ApiResponse.<List<ExamResponse>>builder()
                .success(true)
                .message("Available exams fetched successfully.")
                .data(examService.getAvailableExams())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/attempts")
    public ApiResponse<List<ExamAttemptResponse>> getMyAttempts() {

        return ApiResponse.<List<ExamAttemptResponse>>builder()
                .success(true)
                .message("Attempts fetched successfully.")
                .data(examAttemptService.getMyAttempts())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/test")
    public String test() {
        return "Student Controller Working";
    }
}