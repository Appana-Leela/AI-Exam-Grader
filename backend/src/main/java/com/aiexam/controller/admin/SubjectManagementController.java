package com.aiexam.controller.admin;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.admin.CreateSubjectRequest;
import com.aiexam.dto.admin.SubjectResponse;
import com.aiexam.dto.admin.UpdateSubjectRequest;
import com.aiexam.service.SubjectManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subjects")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class SubjectManagementController {

    private final SubjectManagementService subjectManagementService;

    @GetMapping
    public ApiResponse<List<SubjectResponse>> getAllSubjects() {

        return ApiResponse.<List<SubjectResponse>>builder()
                .success(true)
                .message("Subjects fetched successfully.")
                .data(subjectManagementService.getAllSubjects())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SubjectResponse> getSubject(
            @PathVariable String id) {

        return ApiResponse.<SubjectResponse>builder()
                .success(true)
                .message("Subject fetched successfully.")
                .data(subjectManagementService.getSubjectById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<SubjectResponse> createSubject(
            @Valid @RequestBody CreateSubjectRequest request) {

        return ApiResponse.<SubjectResponse>builder()
                .success(true)
                .message("Subject created successfully.")
                .data(subjectManagementService.createSubject(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<SubjectResponse> updateSubject(
            @PathVariable String id,
            @Valid @RequestBody UpdateSubjectRequest request) {

        return ApiResponse.<SubjectResponse>builder()
                .success(true)
                .message("Subject updated successfully.")
                .data(subjectManagementService.updateSubject(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteSubject(
            @PathVariable String id) {

        subjectManagementService.deleteSubject(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Subject deleted successfully.")
                .build();
    }

    @PatchMapping("/{id}/enable")
    public ApiResponse<Void> enableSubject(
            @PathVariable String id) {

        subjectManagementService.enableSubject(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Subject enabled successfully.")
                .build();
    }

    @PatchMapping("/{id}/disable")
    public ApiResponse<Void> disableSubject(
            @PathVariable String id) {

        subjectManagementService.disableSubject(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Subject disabled successfully.")
                .build();
    }
}