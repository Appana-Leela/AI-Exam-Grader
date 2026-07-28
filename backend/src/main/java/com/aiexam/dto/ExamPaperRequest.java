package com.aiexam.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamPaperRequest {

    private String courseId;

    private String subjectId;

    private Integer totalMarks;

    private Integer totalQuestions;

    private Integer easyQuestions;

    private Integer mediumQuestions;

    private Integer hardQuestions;

}