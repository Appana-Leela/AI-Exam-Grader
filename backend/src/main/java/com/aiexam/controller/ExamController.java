package com.aiexam.controller;

import com.aiexam.dto.CreateExamRequest;
import com.aiexam.dto.ExamResponse;
import com.aiexam.dto.UpdateExamRequest;
import com.aiexam.service.ExamService;
import com.aiexam.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<ExamResponse> createExam(
            @Valid @RequestBody CreateExamRequest request) {

        return ApiResponse.<ExamResponse>builder()
                .success(true)
                .message("Exam created successfully")
                .data(examService.createExam(request))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<List<ExamResponse>> getAllExams() {

        return ApiResponse.<List<ExamResponse>>builder()
                .success(true)
                .message("Exams fetched successfully")
                .data(examService.getAllExams())
                .build();
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<List<ExamResponse>> getMyExams() {

        return ApiResponse.<List<ExamResponse>>builder()
                .success(true)
                .message("My exams fetched successfully")
                .data(examService.getMyExams())
                .build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<ExamResponse> getExamById(
            @PathVariable String id) {

        return ApiResponse.<ExamResponse>builder()
                .success(true)
                .message("Exam fetched successfully")
                .data(examService.getExamById(id))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<ExamResponse> updateExam(
            @PathVariable String id,
            @Valid @RequestBody UpdateExamRequest request) {

        return ApiResponse.<ExamResponse>builder()
                .success(true)
                .message("Exam updated successfully")
                .data(examService.updateExam(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<Void> deleteExam(
            @PathVariable String id) {

        examService.deleteExam(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Exam deleted successfully")
                .build();
    }

    @PatchMapping("/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ApiResponse<ExamResponse> publishExam(
            @PathVariable String id) {

        return ApiResponse.<ExamResponse>builder()
                .success(true)
                .message("Exam published successfully")
                .data(examService.publishExam(id))
                .build();
    }
}