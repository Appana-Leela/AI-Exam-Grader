package com.aiexam.service.impl;

import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.dto.SaveAnswerRequest;
import com.aiexam.dto.StartExamRequest;
import com.aiexam.dto.TeacherAttemptResponse;
import com.aiexam.dto.TeacherEvaluationRequest;
import com.aiexam.dto.TeacherQuestionEvaluationRequest;
import com.aiexam.entity.Exam;
import com.aiexam.entity.ExamAttempt;
import com.aiexam.entity.Question;
import com.aiexam.entity.StudentAnswer;
import com.aiexam.enums.AttemptStatus;
import com.aiexam.exception.BadRequestException;
import com.aiexam.mapper.ExamAttemptMapper;
import com.aiexam.repository.ExamAttemptRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.repository.QuestionRepository;
import com.aiexam.security.SecurityUtils;
import com.aiexam.service.AIService;
import com.aiexam.service.ExamAttemptService;
import com.aiexam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.aiexam.dto.AIEvaluationRequest;
import com.aiexam.dto.AIEvaluationResponse;
import com.aiexam.service.AIService;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamAttemptServiceImpl implements ExamAttemptService {

    private final ExamAttemptRepository examAttemptRepository;
    private final ExamRepository examRepository;
    private final ExamService examService;
    private final QuestionRepository questionRepository;
    private final AIService aiService;

    @Override
    public ExamAttemptResponse startExam(StartExamRequest request) {

        examService.validateExamForAttempt(request.getExamId());

        String email = SecurityUtils.getCurrentUserEmail();

        examAttemptRepository
                .findByExamIdAndStudentEmail(
                        request.getExamId(),
                        email
                )
                .ifPresent(attempt -> {
                    throw new BadRequestException(
                            "Exam already started."
                    );
                });

        ExamAttempt attempt = ExamAttempt.builder()
                .examId(request.getExamId())
                .studentEmail(email)
                .startedAt(LocalDateTime.now())
                .status(AttemptStatus.STARTED)
                .build();

        return buildResponse(
                examAttemptRepository.save(attempt)
        );
    }

    @Override
    public ExamAttemptResponse saveAnswer(
            String attemptId,
            SaveAnswerRequest request
    ) {

        ExamAttempt attempt = getAttemptEntity(attemptId);

        StudentAnswer answer = StudentAnswer.builder()
                .questionId(request.getQuestionId())
                .selectedOptionId(request.getSelectedOptionId())
                .descriptiveAnswer(request.getDescriptiveAnswer())
                .build();

        attempt.getAnswers().removeIf(existing ->
                existing.getQuestionId()
                        .equals(request.getQuestionId()));

        attempt.getAnswers().add(answer);

        attempt.setStatus(AttemptStatus.IN_PROGRESS);

        return buildResponse(
                examAttemptRepository.save(attempt)
        );
    }

    @Override
    public ExamAttemptResponse submitExam(String attemptId) {

        ExamAttempt attempt = getAttemptEntity(attemptId);

        double totalMarks = 0;

        for (StudentAnswer answer : attempt.getAnswers()) {

            Question question = questionRepository
        .findById(answer.getQuestionId())
        .orElse(null);

            if (question == null)
                continue;

            if (question.getQuestionType().name().equals("MCQ")) {

                boolean correct = question.getOptions()

                        .stream()

                        .anyMatch(option ->

                                option.getOptionId()
                                        .equals(answer.getSelectedOptionId())

                                        &&

                                        Boolean.TRUE.equals(
                                                option.getCorrect()
                                        )

                        );

                if (correct) {

                    answer.setMarksAwarded(
                            question.getMarks().doubleValue()
                    );

                    totalMarks += question.getMarks();

                } else {

                    answer.setMarksAwarded(0.0);

                }

                answer.setEvaluated(true);

            }

        }

        double examTotalMarks = questionRepository

        .findByExamIdAndActiveTrue(
                attempt.getExamId()
        )

        .stream()

        .mapToDouble(q -> q.getMarks())

        .sum();

attempt.setTotalMarksObtained(totalMarks);

attempt.setTotalMarks(examTotalMarks);

attempt.setPercentage(

        examTotalMarks == 0

                ? 0

                : (totalMarks * 100.0) / examTotalMarks

);

attempt.setSubmittedAt(LocalDateTime.now());

attempt.setStatus(AttemptStatus.SUBMITTED);
        attempt = examAttemptRepository.save(attempt);

        Exam exam = examRepository
                .findById(attempt.getExamId())
                .orElse(null);

        return ExamAttemptMapper.toResponse(
                attempt,
                exam
        );
    }

        @Override
    public ExamAttemptResponse getAttempt(String attemptId) {

        return buildResponse(
                getAttemptEntity(attemptId)
        );

    }

    @Override
    public List<ExamAttemptResponse> getMyAttempts() {

        String email = SecurityUtils.getCurrentUserEmail();

        return examAttemptRepository

                .findByStudentEmail(email)

                .stream()

                .map(this::buildResponse)

                .toList();

    }

    private ExamAttempt getAttemptEntity(String attemptId) {

        return examAttemptRepository

                .findById(attemptId)

                .orElseThrow(() ->

                        new BadRequestException(
                                "Attempt not found."
                        )

                );

    }

    private ExamAttemptResponse buildResponse(
            ExamAttempt attempt
    ) {

        Exam exam = examRepository

                .findById(attempt.getExamId())

                .orElse(null);

        return ExamAttemptMapper.toResponse(
                attempt,
                exam
        );

    }

    @Override
    public List<TeacherAttemptResponse> getAttemptsByExam(
            String examId
    ) {

        Exam exam = examRepository

                .findById(examId)

                .orElseThrow(() ->

                        new BadRequestException(
                                "Exam not found."
                        )

                );

        return examAttemptRepository

                .findByExamIdAndStatus(
                        examId,
                        AttemptStatus.SUBMITTED
                )

                .stream()

                .map(attempt ->

                        TeacherAttemptResponse.builder()

                                .attemptId(
                                        attempt.getId()
                                )

                                .studentEmail(
                                        attempt.getStudentEmail()
                                )

                                .examTitle(
                                        exam.getTitle()
                                )

                                .subject(
                                        exam.getSubject()
                                )

                                .startedAt(
                                        attempt.getStartedAt()
                                )

                                .submittedAt(
                                        attempt.getSubmittedAt()
                                )

                                .marks(
                                        attempt.getTotalMarksObtained()
                                )

                                .status(
                                        attempt.getStatus().name()
                                )

                                .build()

                )

                .toList();

    }

        @Override
    public ExamAttemptResponse evaluateAttempt(
            String attemptId,
            TeacherEvaluationRequest request
    ) {

        ExamAttempt attempt = getAttemptEntity(attemptId);

        double obtainedMarks =

        attempt.getTotalMarksObtained() == null

                ? 0.0

                : attempt.getTotalMarksObtained();

StringBuilder aiSummary = new StringBuilder();

        for (TeacherQuestionEvaluationRequest evaluation : request.getEvaluations()) {

            StudentAnswer answer = attempt.getAnswers()

                    .stream()

                    .filter(a ->
                            a.getQuestionId()
                                    .equals(evaluation.getQuestionId()))

                    .findFirst()

                    .orElse(null);

            if (answer == null) {
                continue;
            }

            if (answer.getMarksAwarded() != null) {
                obtainedMarks -= answer.getMarksAwarded();
            }

            answer.setMarksAwarded(
                    evaluation.getMarksAwarded()
            );

            answer.setTeacherRemarks(
                    evaluation.getRemarks()
            );

            if (answer.getDescriptiveAnswer() != null &&
                    !answer.getDescriptiveAnswer().isBlank()) {

                Question question = questionRepository
        .findById(answer.getQuestionId())
        .orElse(null);

                if (question != null) {

                    try {

                        AIEvaluationRequest aiRequest = new AIEvaluationRequest();

aiRequest.setQuestion(
        question.getQuestionText()
);

aiRequest.setExpectedAnswer(
        question.getExpectedAnswer()
);

aiRequest.setStudentAnswer(
        answer.getDescriptiveAnswer()
);

aiRequest.setMaximumMarks(
        question.getMarks()
);

AIEvaluationResponse aiResponse =
        aiService.evaluateAnswer(aiRequest);

StringBuilder feedback = new StringBuilder();

feedback.append("Suggested Marks : ")
        .append(aiResponse.getSuggestedMarks())
        .append("/")
        .append(question.getMarks())
        .append("\n\n");

feedback.append("Feedback:\n")
        .append(aiResponse.getFeedback())
        .append("\n\n");

if (aiResponse.getStrengths() != null) {

    feedback.append("Strengths\n");

    aiResponse.getStrengths().forEach(item ->
            feedback.append("• ")
                    .append(item)
                    .append("\n"));

    feedback.append("\n");
}

if (aiResponse.getWeaknesses() != null) {

    feedback.append("Weaknesses\n");

    aiResponse.getWeaknesses().forEach(item ->
            feedback.append("• ")
                    .append(item)
                    .append("\n"));

    feedback.append("\n");
}

if (aiResponse.getSuggestions() != null) {

    feedback.append("Suggestions\n");

    aiResponse.getSuggestions().forEach(item ->
            feedback.append("• ")
                    .append(item)
                    .append("\n"));
}

answer.setAiFeedback(
        feedback.toString()
);

                    }

                    catch (Exception ex) {

                        ex.printStackTrace();

                        answer.setAiFeedback(
                                "AI feedback could not be generated."
                        );

                    }

                }

            }

            answer.setEvaluated(true);

            if (evaluation.getMarksAwarded() != null) {

                obtainedMarks += evaluation.getMarksAwarded();

            }

        }

        double examTotalMarks =

        questionRepository.findByExamId(
                attempt.getExamId()
        )

                .stream()

                .mapToDouble(q -> q.getMarks())

                .sum();

attempt.setTotalMarksObtained(

        obtainedMarks

);

attempt.setTotalMarks(

        examTotalMarks

);

attempt.setPercentage(

        examTotalMarks == 0

                ? 0

                : (obtainedMarks * 100.0)

                / examTotalMarks

);

attempt.setEvaluated(true);

attempt.setEvaluatedAt(

        LocalDateTime.now()

);

attempt.setTeacherRemarks(

        "Evaluation completed successfully."

);

attempt.setAiFeedback(

        aiSummary.toString()

);

attempt = examAttemptRepository.save(attempt);

return buildResponse(attempt);

    }

}
