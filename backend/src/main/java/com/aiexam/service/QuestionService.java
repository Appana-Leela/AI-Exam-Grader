package com.aiexam.service;

import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;

import java.util.List;

public interface QuestionService {

    QuestionResponse createQuestion(CreateQuestionRequest request);

    QuestionResponse updateQuestion(
            String questionId,
            UpdateQuestionRequest request);

    QuestionResponse getQuestionById(String questionId);

    List<QuestionResponse> getQuestionsByExam(String examId);

    List<QuestionResponse> getAllQuestions();

    void deleteQuestion(String questionId);

    
}