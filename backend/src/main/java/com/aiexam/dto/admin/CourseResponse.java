package com.aiexam.dto.admin;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseResponse {

    private String id;

    private String courseCode;

    private String courseName;

    private String description;

    private String duration;

    private Boolean enabled;

    private Boolean deleted;

}