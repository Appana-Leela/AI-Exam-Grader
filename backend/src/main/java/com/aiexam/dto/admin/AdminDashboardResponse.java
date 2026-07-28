package com.aiexam.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    // ==============================
    // Teacher Statistics
    // ==============================
    private long totalTeachers;
    private long activeTeachers;

    // ==============================
    // Student Statistics
    // ==============================
    private long totalStudents;
    private long activeStudents;

    // ==============================
    // Course Statistics
    // ==============================
    private long totalCourses;
    private long activeCourses;

    // ==============================
    // Subject Statistics
    // ==============================
    private long totalSubjects;
    private long activeSubjects;

    // ==============================
    // Exam Statistics
    // ==============================
    private long totalExams;

    private long draftExams;

    private long scheduledExams;

    private long ongoingExams;

    private long completedExams;

    private long cancelledExams;

    private long publishedExams;

}