package com.aiexam.service;

import com.aiexam.dto.CreateExamRequest;
import com.aiexam.dto.ExamResponse;
import com.aiexam.dto.UpdateExamRequest;
import com.aiexam.entity.Exam;

import java.util.List;

public interface ExamService {

    ExamResponse createExam(CreateExamRequest request);

    ExamResponse updateExam(String examId, UpdateExamRequest request);

    ExamResponse getExamById(String examId);

    List<ExamResponse> getAllExams();

    List<ExamResponse> getMyExams();

    void deleteExam(String examId);

    ExamResponse publishExam(String examId);

    boolean isExamAvailable(String examId);

    Exam validateExamForAttempt(String examId);

    List<ExamResponse> getAvailableExams();
}