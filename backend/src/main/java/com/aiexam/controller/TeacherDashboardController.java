package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.dashboard.TeacherDashboardResponse;
import com.aiexam.service.TeacherDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class TeacherDashboardController {

    private final TeacherDashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<TeacherDashboardResponse> getDashboard() {

        return ApiResponse.<TeacherDashboardResponse>builder()

                .success(true)

                .message("Dashboard loaded successfully.")

                .data(
                        dashboardService.getDashboard()
                )

                .build();

    }

}