package com.aiexam.controller.admin;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.admin.AdminExamResponse;
import com.aiexam.dto.admin.CreateAdminExamRequest;
import com.aiexam.dto.admin.UpdateAdminExamRequest;
import com.aiexam.service.AdminExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/exams")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminExamController {

    private final AdminExamService adminExamService;

    /**
     * Create Exam
     */
    @PostMapping
    public ApiResponse<AdminExamResponse> createExam(
            @Valid @RequestBody CreateAdminExamRequest request) {

        return ApiResponse.<AdminExamResponse>builder()
                .success(true)
                .message("Exam created successfully.")
                .data(adminExamService.createExam(request))
                .build();
    }

    /**
     * Get All Exams
     */
    @GetMapping
    public ApiResponse<List<AdminExamResponse>> getAllExams() {

        return ApiResponse.<List<AdminExamResponse>>builder()
                .success(true)
                .message("Exams fetched successfully.")
                .data(adminExamService.getAllExams())
                .build();
    }

    /**
     * Get Exam By Id
     */
    @GetMapping("/{examId}")
    public ApiResponse<AdminExamResponse> getExam(
            @PathVariable String examId) {

        return ApiResponse.<AdminExamResponse>builder()
                .success(true)
                .message("Exam fetched successfully.")
                .data(adminExamService.getExam(examId))
                .build();
    }

    /**
     * Update Exam
     */
    @PutMapping("/{examId}")
    public ApiResponse<AdminExamResponse> updateExam(
            @PathVariable String examId,
            @Valid @RequestBody UpdateAdminExamRequest request) {

        return ApiResponse.<AdminExamResponse>builder()
                .success(true)
                .message("Exam updated successfully.")
                .data(adminExamService.updateExam(examId, request))
                .build();
    }

    /**
     * Delete Exam
     */
    @DeleteMapping("/{examId}")
    public ApiResponse<Void> deleteExam(
            @PathVariable String examId) {

        adminExamService.deleteExam(examId);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Exam deleted successfully.")
                .build();
    }

    /**
     * Publish Exam
     */
    @PatchMapping("/{examId}/publish")
    public ApiResponse<AdminExamResponse> publishExam(
            @PathVariable String examId) {

        return ApiResponse.<AdminExamResponse>builder()
                .success(true)
                .message("Exam published successfully.")
                .data(adminExamService.publishExam(examId))
                .build();
    }

    /**
     * Archive Exam
     */
    @PatchMapping("/{examId}/archive")
    public ApiResponse<AdminExamResponse> archiveExam(
            @PathVariable String examId) {

        return ApiResponse.<AdminExamResponse>builder()
                .success(true)
                .message("Exam archived successfully.")
                .data(adminExamService.archiveExam(examId))
                .build();
    }

}