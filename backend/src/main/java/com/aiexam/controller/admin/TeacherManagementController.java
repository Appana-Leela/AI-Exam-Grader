package com.aiexam.controller.admin;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.admin.CreateTeacherRequest;
import com.aiexam.dto.admin.TeacherResponse;
import com.aiexam.dto.admin.UpdateTeacherRequest;
import com.aiexam.service.TeacherManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/teachers")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class TeacherManagementController {

    private final TeacherManagementService teacherManagementService;

    @GetMapping
    public ApiResponse<List<TeacherResponse>> getAllTeachers() {

        return ApiResponse.<List<TeacherResponse>>builder()
                .success(true)
                .message("Teachers fetched successfully.")
                .data(teacherManagementService.getAllTeachers())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<TeacherResponse> getTeacher(
            @PathVariable String id) {

        return ApiResponse.<TeacherResponse>builder()
                .success(true)
                .message("Teacher fetched successfully.")
                .data(teacherManagementService.getTeacherById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<TeacherResponse> createTeacher(
            @Valid @RequestBody CreateTeacherRequest request) {

        return ApiResponse.<TeacherResponse>builder()
                .success(true)
                .message("Teacher created successfully.")
                .data(teacherManagementService.createTeacher(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<TeacherResponse> updateTeacher(
            @PathVariable String id,
            @Valid @RequestBody UpdateTeacherRequest request) {

        return ApiResponse.<TeacherResponse>builder()
                .success(true)
                .message("Teacher updated successfully.")
                .data(teacherManagementService.updateTeacher(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTeacher(
            @PathVariable String id) {

        teacherManagementService.deleteTeacher(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Teacher deleted successfully.")
                .build();
    }

    @PatchMapping("/{id}/enable")
    public ApiResponse<Void> enableTeacher(
            @PathVariable String id) {

        teacherManagementService.enableTeacher(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Teacher enabled successfully.")
                .build();
    }

    @PatchMapping("/{id}/disable")
    public ApiResponse<Void> disableTeacher(
            @PathVariable String id) {

        teacherManagementService.disableTeacher(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Teacher disabled successfully.")
                .build();
    }

}