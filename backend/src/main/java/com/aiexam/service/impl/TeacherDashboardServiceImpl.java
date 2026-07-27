package com.aiexam.service.impl;

import com.aiexam.dto.dashboard.TeacherDashboardResponse;
import com.aiexam.entity.Exam;
import com.aiexam.entity.ExamAttempt;
import com.aiexam.repository.ExamAttemptRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.security.SecurityUtils;
import com.aiexam.service.TeacherDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherDashboardServiceImpl
        implements TeacherDashboardService {

    private final ExamRepository examRepository;

    private final ExamAttemptRepository examAttemptRepository;

    @Override
    public TeacherDashboardResponse getDashboard() {

        String teacherEmail =
                SecurityUtils.getCurrentUserEmail();

        long totalExams =
                examRepository.countByCreatedBy(
                        teacherEmail
                );

        long publishedExams =
                examRepository.countByCreatedByAndPublishedTrue(
                        teacherEmail
                );

        List<Exam> exams =
                examRepository.findByCreatedBy(
                        teacherEmail
                );

        long totalAttempts = 0;

        double totalMarks = 0;

        long evaluatedAttempts = 0;

        long passed = 0;

        for (Exam exam : exams) {

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

                        passed++;

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

                        : (passed * 100.0)

                        / evaluatedAttempts;

        double failPercentage =
                100 - passPercentage;

        return TeacherDashboardResponse

                .builder()

                .totalExams(totalExams)

                .publishedExams(publishedExams)

                .totalAttempts(totalAttempts)

                .averageMarks(
                        averageMarks
                )

                .passPercentage(
                        passPercentage
                )

                .failPercentage(
                        failPercentage
                )

                .build();

    }

}