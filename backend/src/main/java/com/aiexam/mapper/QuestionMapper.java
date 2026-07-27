package com.aiexam.mapper;

import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;
import com.aiexam.entity.Question;

public class QuestionMapper {

    private QuestionMapper() {
    }

    public static Question toEntity(CreateQuestionRequest request) {

        return Question.builder()

                .examId(request.getExamId())

                .questionText(request.getQuestionText())

                .questionType(request.getQuestionType())

                .difficultyLevel(request.getDifficultyLevel())

                .marks(request.getMarks())

                .options(request.getOptions())

                .expectedAnswer(request.getExpectedAnswer())

                .evaluationRubric(
                        request.getEvaluationRubric()
                )

                .keywords(
                        request.getKeywords()
                )

                .bloomLevel(
                        request.getBloomLevel()
                )

                .explanation(request.getExplanation())

                .build();

    }

    public static QuestionResponse toResponse(
            Question question
    ) {

        return QuestionResponse.builder()

                .id(question.getId())

                .examId(question.getExamId())

                .questionText(question.getQuestionText())

                .questionType(question.getQuestionType())

                .difficultyLevel(question.getDifficultyLevel())

                .marks(question.getMarks())

                .options(question.getOptions())

                .expectedAnswer(question.getExpectedAnswer())

                .evaluationRubric(
                        question.getEvaluationRubric()
                )

                .keywords(
                        question.getKeywords()
                )

                .bloomLevel(
                        question.getBloomLevel()
                )

                .explanation(question.getExplanation())

                .active(question.getActive())

                .build();

    }

    public static void updateEntity(

            Question question,

            UpdateQuestionRequest request

    ) {

        question.setQuestionText(
                request.getQuestionText()
        );

        question.setQuestionType(
                request.getQuestionType()
        );

        question.setDifficultyLevel(
                request.getDifficultyLevel()
        );

        question.setMarks(
                request.getMarks()
        );

        question.setOptions(
                request.getOptions()
        );

        question.setExpectedAnswer(
                request.getExpectedAnswer()
        );

        question.setEvaluationRubric(
                request.getEvaluationRubric()
        );

        question.setKeywords(
                request.getKeywords()
        );

        question.setBloomLevel(
                request.getBloomLevel()
        );

        question.setExplanation(
                request.getExplanation()
        );

    }
}