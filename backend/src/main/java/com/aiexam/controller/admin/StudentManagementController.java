package com.aiexam.controller.admin;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.admin.CreateStudentRequest;
import com.aiexam.dto.admin.StudentResponse;
import com.aiexam.dto.admin.UpdateStudentRequest;
import com.aiexam.service.StudentManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StudentManagementController {

    private final StudentManagementService studentManagementService;

    @GetMapping
    public ApiResponse<List<StudentResponse>> getAllStudents() {

        return ApiResponse.<List<StudentResponse>>builder()
                .success(true)
                .message("Students fetched successfully.")
                .data(studentManagementService.getAllStudents())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<StudentResponse> getStudentById(
            @PathVariable String id) {

        return ApiResponse.<StudentResponse>builder()
                .success(true)
                .message("Student fetched successfully.")
                .data(studentManagementService.getStudentById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<StudentResponse> createStudent(
            @Valid @RequestBody CreateStudentRequest request) {

        StudentResponse student =
                studentManagementService.createStudent(request);

        return ApiResponse.<StudentResponse>builder()
                .success(true)
                .message("Student created successfully.")
                .data(student)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<StudentResponse> updateStudent(
            @PathVariable String id,
            @Valid @RequestBody UpdateStudentRequest request) {

        StudentResponse student =
                studentManagementService.updateStudent(id, request);

        return ApiResponse.<StudentResponse>builder()
                .success(true)
                .message("Student updated successfully.")
                .data(student)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteStudent(
            @PathVariable String id) {

        studentManagementService.deleteStudent(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Student deleted successfully.")
                .build();
    }

    @PatchMapping("/{id}/enable")
    public ApiResponse<Void> enableStudent(
            @PathVariable String id) {

        studentManagementService.enableStudent(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Student enabled successfully.")
                .build();
    }

    @PatchMapping("/{id}/disable")
    public ApiResponse<Void> disableStudent(
            @PathVariable String id) {

        studentManagementService.disableStudent(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Student disabled successfully.")
                .build();
    }

}