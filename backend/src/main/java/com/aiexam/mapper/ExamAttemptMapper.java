package com.aiexam.mapper;

import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.entity.Exam;
import com.aiexam.entity.ExamAttempt;

public class ExamAttemptMapper {

    private ExamAttemptMapper() {
    }

    public static ExamAttemptResponse toResponse(
        ExamAttempt attempt,
        Exam exam
) {

    double percentage =
            attempt.getPercentage() == null
                    ? 0
                    : attempt.getPercentage();

    String result =
            percentage >= 40
                    ? "PASS"
                    : "FAIL";

    String grade;

    if (percentage >= 90)
        grade = "A+";
    else if (percentage >= 80)
        grade = "A";
    else if (percentage >= 70)
        grade = "B";
    else if (percentage >= 60)
        grade = "C";
    else if (percentage >= 50)
        grade = "D";
    else
        grade = "F";

    return ExamAttemptResponse.builder()

            .id(attempt.getId())

            .examId(attempt.getExamId())

            .examTitle(
                    exam != null
                            ? exam.getTitle()
                            : null
            )

            .subject(
                    exam != null
                            ? exam.getSubject()
                            : null
            )

            .courseCode(
                    exam != null
                            ? exam.getCourseCode()
                            : null
            )

            .studentEmail(
                    attempt.getStudentEmail()
            )

            .status(
                    attempt.getStatus()
            )

            .startedAt(
                    attempt.getStartedAt()
            )

            .submittedAt(
                    attempt.getSubmittedAt()
            )

            .totalMarksObtained(
                    attempt.getTotalMarksObtained()
            )

            .totalMarks(
                    attempt.getTotalMarks()
            )

            .percentage(
                    percentage
            )

            .result(
                    result
            )

            .grade(
                    grade
            )

            .evaluated(
                    attempt.getEvaluated()
            )

            .teacherRemarks(
                    attempt.getTeacherRemarks()
            )

            .aiFeedback(
                    attempt.getAiFeedback()
            )

            .answers(
                    attempt.getAnswers()
            )

            .build();

}

}