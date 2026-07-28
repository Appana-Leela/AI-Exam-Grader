package com.aiexam.entity;

import com.aiexam.enums.BloomLevel;
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

    // ==========================================================
    // Relationships
    // ==========================================================

    @Indexed
    private String examId;

    private String courseId;

    private String subjectId;

    private String teacherId;

    // ==========================================================
    // Question Details
    // ==========================================================

    private String questionText;

    private QuestionType questionType;

    private DifficultyLevel difficultyLevel;

    private BloomLevel bloomLevel;

    private Integer marks;

    @Builder.Default
    private Double negativeMarks = 0.0;

    /*
     * Estimated time (minutes)
     */
    private Integer expectedTime;

    /*
     * Display order inside question paper
     */
    private Integer displayOrder;

    // ==========================================================
    // MCQ Options
    // ==========================================================

    private List<QuestionOption> options;

    // ==========================================================
    // AI Evaluation Fields
    // ==========================================================

    /*
     * Ideal / Expected Answer
     */
    private String expectedAnswer;

    /*
     * AI Evaluation Rubric
     */
    private String evaluationRubric;

    /*
     * Important keywords expected in answer
     */
    private List<String> keywords;

    /*
     * Explanation shown after exam
     */
    private String explanation;

    // ==========================================================
    // Status
    // ==========================================================

    @Builder.Default
    private Boolean active = true;
}