package com.aiexam.entity;

import com.aiexam.enums.AttemptStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "exam_attempts")
public class ExamAttempt extends BaseEntity {

    @Id
    private String id;

    @Indexed
    private String examId;

    @Indexed
    private String studentEmail;

    private LocalDateTime startedAt;

    private LocalDateTime submittedAt;

    @Builder.Default
    private AttemptStatus status = AttemptStatus.STARTED;

    // ===============================
    // Evaluation Fields
    // ===============================

    @Builder.Default
    private Double totalMarksObtained = 0.0;

    @Builder.Default
    private Double totalMarks = 0.0;

    @Builder.Default
    private Double percentage = 0.0;

    @Builder.Default
    private Boolean evaluated = false;

    private LocalDateTime evaluatedAt;

    private String teacherRemarks;

    private String aiFeedback;

    @Builder.Default
    private List<StudentAnswer> answers = new ArrayList<>();

}