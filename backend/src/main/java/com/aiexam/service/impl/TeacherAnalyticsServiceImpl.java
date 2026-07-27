package com.aiexam.service.impl;

import com.aiexam.dto.RecentExamResponse;
import com.aiexam.dto.TeacherAnalyticsResponse;
import com.aiexam.entity.Exam;
import com.aiexam.entity.ExamAttempt;
import com.aiexam.enums.AttemptStatus;
import com.aiexam.repository.ExamAttemptRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.security.SecurityUtils;
import com.aiexam.service.TeacherAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherAnalyticsServiceImpl
        implements TeacherAnalyticsService {

    private final ExamRepository examRepository;

    private final ExamAttemptRepository examAttemptRepository;

    @Override
        public TeacherAnalyticsResponse getAnalytics() {

        String teacherEmail =
                SecurityUtils.getCurrentUserEmail();

        List<Exam> teacherExams =
                examRepository.findByCreatedBy(
                        teacherEmail
                );

        long totalExams =
                teacherExams.size();

        long publishedExams =
                teacherExams.stream()

                        .filter(exam ->
                                Boolean.TRUE.equals(
                                        exam.getPublished()
                                )
                        )

                        .count();

        long totalAttempts = 0;

        long evaluatedAttempts = 0;

        long passedAttempts = 0;

        double totalMarks = 0;

        for (Exam exam : teacherExams) {

                List<ExamAttempt> attempts =
                        examAttemptRepository.findByExamId(
                                exam.getId()
                        );

                totalAttempts += attempts.size();

                for (ExamAttempt attempt : attempts) {

                if (Boolean.TRUE.equals(
                        attempt.getEvaluated()
                )) {

                        evaluatedAttempts++;

                        totalMarks +=
                                attempt.getTotalMarksObtained();

                        if (attempt.getPercentage() >= 40) {

                        passedAttempts++;

                        }

                }

                }

        }

        double averageMarks =

                evaluatedAttempts == 0

                        ? 0

                        : totalMarks / evaluatedAttempts;

        double passPercentage =

                evaluatedAttempts == 0

                        ? 0

                        : (passedAttempts * 100.0)

                        / evaluatedAttempts;

        double failPercentage =

                100 - passPercentage;

        return TeacherAnalyticsResponse

                .builder()

                .totalExams(totalExams)

                .publishedExams(publishedExams)

                .totalAttempts(totalAttempts)

                .averageMarks(

                        Math.round(
                                averageMarks * 100
                        ) / 100.0

                )

                .passPercentage(

                        Math.round(
                                passPercentage * 100
                        ) / 100.0

                )

                .failPercentage(

                        Math.round(
                                failPercentage * 100
                        ) / 100.0

                )

                .build();

        }
      @Override
        public List<RecentExamResponse> getRecentExams() {

        String teacher =
                SecurityUtils.getCurrentUserEmail();

        return examRepository

                .findByCreatedBy(teacher)

                .stream()

                .sorted((a,b)->

                        b.getStartTime()
                                .compareTo(a.getStartTime())
                )

                .limit(5)

                .map(exam->

                        RecentExamResponse.builder()

                                .id(exam.getId())

                                .title(exam.getTitle())

                                .subject(exam.getSubject())

                                .status(exam.getStatus().name())

                                .published(exam.getPublished())

                                .attempts(

                                        examAttemptRepository
                                                .countByExamId(
                                                        exam.getId()
                                                )

                                )

                                .build()

                )

                .toList();

        }
}