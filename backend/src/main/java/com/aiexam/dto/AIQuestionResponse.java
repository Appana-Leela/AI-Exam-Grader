package com.aiexam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIQuestionResponse {

    private String topic;

    private Integer totalGenerated;

    private List<GeneratedQuestionDTO> questions;

}