package com.aiexam.entity;

import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "questions")
public class Question extends BaseEntity {

    @Id
    private String id;

    @Indexed
    private String examId;

    private String questionText;

    private QuestionType questionType;

    private DifficultyLevel difficultyLevel;

    private Integer marks;

    private List<QuestionOption> options;

    /*
    * AI Evaluation Fields
    */

    private String expectedAnswer;

    /*
    * Rubric used by AI while grading.
    * Example:
    * Definition = 2 marks
    * Diagram = 3 marks
    * Explanation = 5 marks
    */
    private String evaluationRubric;

    /*
    * Important keywords expected in answer.
    */
    private List<String> keywords;

    /*
    * Bloom Taxonomy Level
    * Remember
    * Understand
    * Apply
    * Analyze
    * Evaluate
    * Create
    */
    private String bloomLevel;

    /*
    * Explanation shown after exam.
    */
    private String explanation;

    @Builder.Default
    private Boolean active = true;
}