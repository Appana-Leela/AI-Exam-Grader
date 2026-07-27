package com.aiexam.dto;

import com.aiexam.enums.ExamStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamResponse {

    private String id;

    private String title;

    private String description;

    private String subject;

    private String courseCode;

    private Integer durationInMinutes;

    private Integer totalMarks;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private ExamStatus status;

    private Boolean published;

    private String createdBy;
}