package com.aiexam.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecentExamResponse {

    private String id;

    private String title;

    private String subject;

    private String status;

    private Boolean published;

    private Long attempts;

}