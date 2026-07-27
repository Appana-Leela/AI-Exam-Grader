package com.aiexam.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedQuestion {

    private String questionText;

    private String expectedAnswer;

    private Integer marks;

    private String difficultyLevel;

    private String questionType;

}