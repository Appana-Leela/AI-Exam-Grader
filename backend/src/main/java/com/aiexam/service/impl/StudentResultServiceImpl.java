package com.aiexam.service.impl;

import com.aiexam.dto.StudentResultResponse;
import com.aiexam.entity.Exam;
import com.aiexam.entity.ExamAttempt;
import com.aiexam.exception.BadRequestException;
import com.aiexam.repository.ExamAttemptRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.service.StudentResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentResultServiceImpl
        implements StudentResultService {

    private final ExamAttemptRepository examAttemptRepository;

    private final ExamRepository examRepository;

    @Override
    public StudentResultResponse getResult(
            String attemptId
    ) {

        ExamAttempt attempt =
                examAttemptRepository.findById(attemptId)

                        .orElseThrow(() ->
                                new BadRequestException(
                                        "Attempt not found."
                                ));

        Exam exam =
                examRepository.findById(
                        attempt.getExamId()
                ).orElseThrow(() ->
                        new BadRequestException(
                                "Exam not found."
                        ));

        double percentage =
                exam.getTotalMarks() == 0

                        ? 0

                        :

                        (attempt.getTotalMarksObtained()
                                * 100)

                                / exam.getTotalMarks();

        return StudentResultResponse.builder()

                .examTitle(
                        exam.getTitle()
                )

                .subject(
                        exam.getSubject()
                )

                .obtainedMarks(
                        attempt.getTotalMarksObtained()
                )

                .totalMarks(
                        exam.getTotalMarks().doubleValue()
                )

                .percentage(
                        Math.round(
                                percentage * 100
                        ) / 100.0
                )

                .result(
                        percentage >= 40
                                ? "PASS"
                                : "FAIL"
                )

                .answers(
                        attempt.getAnswers()
                )

                .build();

    }

}