package com.aiexam.dto;

import com.aiexam.entity.StudentAnswer;
import com.aiexam.enums.AttemptStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ExamAttemptResponse {

    private String id;

    private String examId;

    private String examTitle;

    private String subject;

    private String courseCode;

    private String studentEmail;

    private AttemptStatus status;

    private LocalDateTime startedAt;

    private LocalDateTime submittedAt;

    // ===========================
    // Result Information
    // ===========================

    private Double totalMarksObtained;

    private Double totalMarks;

    private Double percentage;

    private String result;

    private String grade;

    private Boolean evaluated;

    private String teacherRemarks;

    private String aiFeedback;

    private List<StudentAnswer> answers;

}