package com.aiexam.dto;

import com.aiexam.entity.StudentAnswer;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentResultResponse {

    private String examTitle;

    private String subject;

    private Double obtainedMarks;

    private Double totalMarks;

    private Double percentage;

    private String result;

    private List<StudentAnswer> answers;

}