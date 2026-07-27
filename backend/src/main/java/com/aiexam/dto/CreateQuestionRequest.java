package com.aiexam.dto;

import com.aiexam.entity.QuestionOption;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionRequest {

    @NotBlank
    private String examId;

    @NotBlank
    private String questionText;

    @NotNull
    private QuestionType questionType;

    @NotNull
    private DifficultyLevel difficultyLevel;

    @NotNull
    @Min(1)
    private Integer marks;

    private List<QuestionOption> options;

    private String expectedAnswer;

    private String explanation;
    private String evaluationRubric;

    private List<String> keywords;

    private String bloomLevel;
}