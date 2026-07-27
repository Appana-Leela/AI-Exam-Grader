package com.aiexam.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIEvaluationRequest {

    private String question;

    private String expectedAnswer;

    private String studentAnswer;

    private Double maximumMarks;

}