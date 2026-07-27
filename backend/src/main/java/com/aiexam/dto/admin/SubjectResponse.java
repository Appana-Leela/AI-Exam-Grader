package com.aiexam.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectResponse {

    private String id;

    private String subjectCode;

    private String subjectName;

    private String description;

    private Integer credits;

    private Integer semester;

    private String courseId;

    private String courseName;

    private Boolean enabled;

    private Boolean deleted;

}