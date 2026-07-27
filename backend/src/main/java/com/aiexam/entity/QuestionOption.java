package com.aiexam.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionOption {

    private String optionId;

    private String optionText;

    @Builder.Default
    private Boolean correct = false;

}