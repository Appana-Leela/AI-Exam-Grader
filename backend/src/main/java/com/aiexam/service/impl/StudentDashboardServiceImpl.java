package com.aiexam.service.impl;

import com.aiexam.dto.StudentDashboardResponse;
import com.aiexam.entity.ExamAttempt;
import com.aiexam.repository.ExamAttemptRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.security.SecurityUtils;
import com.aiexam.service.StudentDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentDashboardServiceImpl implements StudentDashboardService {

    private final ExamRepository examRepository;
    private final ExamAttemptRepository examAttemptRepository;

    @Override
    public StudentDashboardResponse getDashboard() {

        String studentEmail = SecurityUtils.getCurrentUserEmail();

        List<ExamAttempt> attempts =
                examAttemptRepository.findByStudentEmail(studentEmail);

        Set<String> attemptedExamIds = attempts.stream()
                .map(ExamAttempt::getExamId)
                .collect(Collectors.toSet());

        long totalPublishedExams =
                examRepository.findByPublished(true).size();

        long availableExams =
                Math.max(
                        totalPublishedExams - attemptedExamIds.size(),
                        0
                );

        long completedExams =
                attempts.stream()
                        .filter(a -> a.getSubmittedAt() != null)
                        .count();

        double averageScore =
                attempts.stream()
                        .filter(a ->
                                a.getSubmittedAt() != null &&
                                a.getTotalMarksObtained() != null
                        )
                        .mapToDouble(ExamAttempt::getTotalMarksObtained)
                        .average()
                        .orElse(0.0);

        return StudentDashboardResponse.builder()

                .availableExams(availableExams)

                .completedExams(completedExams)

                .averageScore(
                        Math.round(averageScore * 100.0) / 100.0
                )

                .build();

    }

}