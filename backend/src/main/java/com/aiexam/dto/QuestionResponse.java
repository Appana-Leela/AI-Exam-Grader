package com.aiexam.dto;

import com.aiexam.entity.QuestionOption;
import com.aiexam.enums.BloomLevel;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private String id;

    private String examId;

    private String courseId;

    private String subjectId;

    private String teacherId;

    private String questionText;

    private QuestionType questionType;

    private DifficultyLevel difficultyLevel;

    private BloomLevel bloomLevel;

    private Integer marks;

    private Double negativeMarks;

    private Integer expectedTime;

    private Integer displayOrder;

    private List<QuestionOption> options;

    private String expectedAnswer;

    private String evaluationRubric;

    private List<String> keywords;

    private String explanation;

    private Boolean active;

}