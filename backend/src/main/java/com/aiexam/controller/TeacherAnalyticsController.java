package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.TeacherAnalyticsResponse;
import com.aiexam.service.TeacherAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.aiexam.dto.RecentExamResponse;
@RestController
@RequestMapping("/api/teacher/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherAnalyticsController {

    private final TeacherAnalyticsService
            teacherAnalyticsService;

    @GetMapping
    public ApiResponse<TeacherAnalyticsResponse>
    analytics() {

        return ApiResponse
                .<TeacherAnalyticsResponse>builder()

                .success(true)

                .message(
                        "Analytics fetched successfully."
                )

                .data(
                        teacherAnalyticsService
                                .getAnalytics()
                )

                .build();

    }

    @GetMapping("/recent-exams")
public ApiResponse<List<RecentExamResponse>>
recentExams() {

    return ApiResponse
            .<List<RecentExamResponse>>builder()

            .success(true)

            .message("Recent exams fetched.")

            .data(
                    teacherAnalyticsService
                            .getRecentExams()
            )

            .build();

}

}