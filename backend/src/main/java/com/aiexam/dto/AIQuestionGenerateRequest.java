package com.aiexam.dto;

import com.aiexam.enums.BloomLevel;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIQuestionGenerateRequest {

    private String courseId;

    private String subjectId;

    private String topic;

    private DifficultyLevel difficulty;

    private BloomLevel bloomLevel;

    private QuestionType questionType;

    private Integer numberOfQuestions;

    private Integer marksPerQuestion;

}