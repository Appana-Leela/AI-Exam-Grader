package com.aiexam.dto.ai;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IdealAnswerRequest {

    private String question;

}