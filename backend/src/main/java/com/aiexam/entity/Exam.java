package com.aiexam.entity;

import com.aiexam.enums.ExamStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "exams")
public class Exam extends BaseEntity {

    @Id
    private String id;

    // =====================================================
    // Legacy Fields (Required by Existing Teacher Module)
    // =====================================================

    /**
     * Exam Title
     * Example: Operating Systems Mid-1
     */
    private String title;

    /**
     * Description
     */
    private String description;

    /**
     * Subject Name
     */
    @Indexed
    private String subject;

    /**
     * Course Code
     * Example: CSE301
     */
    @Indexed
    private String courseCode;

    /**
     * Duration in Minutes
     */
    private Integer durationInMinutes;

    /**
     * Total Marks
     */
    private Integer totalMarks;

    /**
     * Exam Start Time
     */
    private LocalDateTime startTime;

    /**
     * Exam End Time
     */
    private LocalDateTime endTime;

    /**
     * Teacher Email
     */
    @Indexed
    private String createdBy;

        // =====================================================
    // Admin Exam Management Fields (Future Module)
    // =====================================================

    /**
     * Unique Exam Code
     */
    @Indexed(unique = true)
    private String examCode;

    /**
     * Admin Display Name
     */
    private String examName;

    /**
     * Course Information
     */
    private String courseId;

    private String courseName;

    /**
     * Subject Information
     */
    private String subjectId;

    private String subjectCode;

    private String subjectName;

    /**
     * Academic Details
     */
    private Integer semester;

    private String section;

    private String academicYear;

    /**
     * Assigned Teacher
     */
    private String teacherId;

    private String teacherName;

    /**
     * Exam Type
     * Mid-1, Mid-2, Lab, Internal, Semester, Quiz
     */
    private String examType;

    /**
     * Passing Marks
     */
    private Integer passingMarks;

    /**
     * General Instructions
     */
    private String instructions;

    // =====================================================
    // Exam Status
    // =====================================================

    @Builder.Default
    private ExamStatus status = ExamStatus.DRAFT;

    @Builder.Default
    private Boolean published = false;

    @Builder.Default
    private Boolean enabled = true;

    @Builder.Default
    private Boolean deleted = false;
}