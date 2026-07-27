package com.aiexam.service;

import com.aiexam.dto.RecentExamResponse;
import com.aiexam.dto.TeacherAnalyticsResponse;

import java.util.List;

public interface TeacherAnalyticsService {

    TeacherAnalyticsResponse getAnalytics();

    List<RecentExamResponse> getRecentExams();

}