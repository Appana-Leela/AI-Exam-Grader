package com.aiexam.controller;

import com.aiexam.dto.ApiResponse;
import com.aiexam.dto.StudentResultResponse;
import com.aiexam.service.StudentResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/results")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentResultController {

    private final StudentResultService
            studentResultService;

    @GetMapping("/{attemptId}")

    public ApiResponse<StudentResultResponse>
    getResult(

            @PathVariable String attemptId

    ) {

        return ApiResponse
                .<StudentResultResponse>builder()

                .success(true)

                .message(
                        "Result fetched successfully."
                )

                .data(
                        studentResultService
                                .getResult(
                                        attemptId
                                )
                )

                .build();

    }

}