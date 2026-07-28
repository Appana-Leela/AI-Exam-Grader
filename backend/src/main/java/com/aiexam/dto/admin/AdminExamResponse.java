package com.aiexam.dto.admin;

import com.aiexam.enums.ExamStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminExamResponse {

    private String id;

    private String examCode;

    private String examName;

    private String description;

    private String courseId;
    private String courseName;
    private String courseCode;

    private String subjectId;
    private String subjectName;
    private String subjectCode;

    private String teacherId;
    private String teacherName;
    private String teacherEmail;

    private Integer semester;

    private String section;

    private String academicYear;

    private String examType;

    private Integer durationInMinutes;

    private Integer totalMarks;

    private Integer passingMarks;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String instructions;

    private ExamStatus status;

    private Boolean published;

    private Boolean enabled;

    private Boolean deleted;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}