package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.admin.CourseResponse;
import com.aiexam.dto.admin.CreateCourseRequest;
import com.aiexam.dto.admin.UpdateCourseRequest;
import com.aiexam.service.CourseManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class CourseManagementController {

    private final CourseManagementService courseManagementService;

    @GetMapping
    public ApiResponse<List<CourseResponse>> getAllCourses() {

        return ApiResponse.<List<CourseResponse>>builder()
                .success(true)
                .message("Courses fetched successfully.")
                .data(courseManagementService.getAllCourses())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<CourseResponse> getCourseById(
            @PathVariable String id) {

        return ApiResponse.<CourseResponse>builder()
                .success(true)
                .message("Course fetched successfully.")
                .data(courseManagementService.getCourseById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<CourseResponse> createCourse(
            @Valid @RequestBody CreateCourseRequest request) {

        return ApiResponse.<CourseResponse>builder()
                .success(true)
                .message("Course created successfully.")
                .data(courseManagementService.createCourse(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseResponse> updateCourse(
            @PathVariable String id,
            @Valid @RequestBody UpdateCourseRequest request) {

        return ApiResponse.<CourseResponse>builder()
                .success(true)
                .message("Course updated successfully.")
                .data(courseManagementService.updateCourse(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteCourse(
            @PathVariable String id) {

        courseManagementService.deleteCourse(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Course deleted successfully.")
                .build();
    }

    @PatchMapping("/{id}/enable")
    public ApiResponse<Void> enableCourse(
            @PathVariable String id) {

        courseManagementService.enableCourse(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Course enabled successfully.")
                .build();
    }

    @PatchMapping("/{id}/disable")
    public ApiResponse<Void> disableCourse(
            @PathVariable String id) {

        courseManagementService.disableCourse(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Course disabled successfully.")
                .build();
    }

}