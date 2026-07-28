package com.aiexam.service;

import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;

import java.util.List;

public interface QuestionService {

    QuestionResponse createQuestion(CreateQuestionRequest request);

    QuestionResponse updateQuestion(String questionId,
                                    UpdateQuestionRequest request);

    QuestionResponse getQuestionById(String questionId);

    List<QuestionResponse> getQuestionsByExam(String examId);

    List<QuestionResponse> getAllQuestions();

    List<QuestionResponse> getQuestionsByCourse(String courseId);

    List<QuestionResponse> getQuestionsBySubject(String subjectId);

    List<QuestionResponse> getQuestionsByTeacher(String teacherId);

    List<QuestionResponse> getQuestionsByDifficulty(DifficultyLevel difficulty);

    List<QuestionResponse> getQuestionsByType(QuestionType questionType);

    void enableQuestion(String id);

    void disableQuestion(String id);

    void deleteQuestion(String questionId);

}