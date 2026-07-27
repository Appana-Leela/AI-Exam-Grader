package com.aiexam.dto.ai;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelAnswerRequest {

    private String question;

    private String expectedAnswer;

}