package com.aiexam.dto;

import com.aiexam.entity.Question;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamPaperResponse {

    private Integer totalMarks;

    private Integer totalQuestions;

    private List<Question> questions;

}