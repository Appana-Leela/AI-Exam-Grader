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

    private long totalTeachers;

    private long totalStudents;

    private long totalExams;

    private long totalPublishedExams;

    private long totalDraftExams;

}