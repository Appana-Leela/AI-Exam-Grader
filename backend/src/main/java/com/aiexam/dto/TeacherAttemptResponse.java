package com.aiexam.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TeacherAttemptResponse {

    private String attemptId;

    private String studentEmail;

    private String examTitle;

    private String subject;

    private LocalDateTime startedAt;

    private LocalDateTime submittedAt;

    private Double marks;

    private String status;

}