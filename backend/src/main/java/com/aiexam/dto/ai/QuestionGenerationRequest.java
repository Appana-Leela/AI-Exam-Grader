package com.aiexam.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionGenerationRequest {

    private String subject;

    private String topic;

    private String difficultyLevel;

    private String questionType;

    private Integer numberOfQuestions;

    private Integer marksPerQuestion;

}