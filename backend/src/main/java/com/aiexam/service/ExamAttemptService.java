package com.aiexam.service;

import java.util.List;
import com.aiexam.dto.ExamAttemptResponse;
import com.aiexam.dto.SaveAnswerRequest;
import com.aiexam.dto.StartExamRequest;
import com.aiexam.dto.TeacherAttemptResponse;
import com.aiexam.dto.TeacherEvaluationRequest;
public interface ExamAttemptService {

    ExamAttemptResponse startExam(StartExamRequest request);

    ExamAttemptResponse saveAnswer(
            String attemptId,
            SaveAnswerRequest request);

    ExamAttemptResponse submitExam(String attemptId);

    ExamAttemptResponse getAttempt(String attemptId);

    List<ExamAttemptResponse> getMyAttempts();

    List<TeacherAttemptResponse> getAttemptsByExam(
        String examId
);

    ExamAttemptResponse evaluateAttempt(
        String attemptId,
        TeacherEvaluationRequest request
);

    
}