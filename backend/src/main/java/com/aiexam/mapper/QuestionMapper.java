package com.aiexam.mapper;

import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;
import com.aiexam.entity.Question;

public class QuestionMapper {

    private QuestionMapper() {
    }

    /**
     * Convert CreateQuestionRequest -> Question Entity
     */
    public static Question toEntity(CreateQuestionRequest request) {

        return Question.builder()

                // Relationships
                .examId(request.getExamId())
                .courseId(request.getCourseId())
                .subjectId(request.getSubjectId())
                .teacherId(request.getTeacherId())

                // Question Details
                .questionText(request.getQuestionText())
                .questionType(request.getQuestionType())
                .difficultyLevel(request.getDifficultyLevel())
                .bloomLevel(request.getBloomLevel())

                .marks(request.getMarks())
                .negativeMarks(request.getNegativeMarks())
                .expectedTime(request.getExpectedTime())
                .displayOrder(request.getDisplayOrder())

                // MCQ Options
                .options(request.getOptions())

                // AI Evaluation
                .expectedAnswer(request.getExpectedAnswer())
                .evaluationRubric(request.getEvaluationRubric())
                .keywords(request.getKeywords())
                .explanation(request.getExplanation())

                .build();
    }

    /**
     * Convert Question Entity -> QuestionResponse
     */
    public static QuestionResponse toResponse(Question question) {

        return QuestionResponse.builder()

                .id(question.getId())

                // Relationships
                .examId(question.getExamId())
                .courseId(question.getCourseId())
                .subjectId(question.getSubjectId())
                .teacherId(question.getTeacherId())

                // Question Details
                .questionText(question.getQuestionText())
                .questionType(question.getQuestionType())
                .difficultyLevel(question.getDifficultyLevel())
                .bloomLevel(question.getBloomLevel())

                .marks(question.getMarks())
                .negativeMarks(question.getNegativeMarks())
                .expectedTime(question.getExpectedTime())
                .displayOrder(question.getDisplayOrder())

                // Options
                .options(question.getOptions())

                // AI Evaluation
                .expectedAnswer(question.getExpectedAnswer())
                .evaluationRubric(question.getEvaluationRubric())
                .keywords(question.getKeywords())
                .explanation(question.getExplanation())

                // Status
                .active(question.getActive())

                .build();
    }

    /**
     * Update Existing Question Entity
     */
    public static void updateEntity(
            Question question,
            UpdateQuestionRequest request
    ) {

        // Relationships
        question.setCourseId(request.getCourseId());
        question.setSubjectId(request.getSubjectId());
        question.setTeacherId(request.getTeacherId());

        // Question Details
        question.setQuestionText(request.getQuestionText());
        question.setQuestionType(request.getQuestionType());
        question.setDifficultyLevel(request.getDifficultyLevel());
        question.setBloomLevel(request.getBloomLevel());

        question.setMarks(request.getMarks());
        question.setNegativeMarks(request.getNegativeMarks());
        question.setExpectedTime(request.getExpectedTime());
        question.setDisplayOrder(request.getDisplayOrder());

        // Options
        question.setOptions(request.getOptions());

        // AI Evaluation
        question.setExpectedAnswer(request.getExpectedAnswer());
        question.setEvaluationRubric(request.getEvaluationRubric());
        question.setKeywords(request.getKeywords());
        question.setExplanation(request.getExplanation());
    }

}