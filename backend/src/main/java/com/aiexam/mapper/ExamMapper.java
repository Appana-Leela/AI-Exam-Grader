package com.aiexam.mapper;

import com.aiexam.dto.CreateExamRequest;
import com.aiexam.dto.ExamResponse;
import com.aiexam.dto.UpdateExamRequest;
import com.aiexam.entity.Exam;

public class ExamMapper {

    private ExamMapper() {
    }

    public static Exam toEntity(CreateExamRequest request) {

        return Exam.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .subject(request.getSubject())
                .courseCode(request.getCourseCode())
                .durationInMinutes(request.getDurationInMinutes())
                .totalMarks(request.getTotalMarks())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();
    }

    public static ExamResponse toResponse(Exam exam) {

        return ExamResponse.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .description(exam.getDescription())
                .subject(exam.getSubject())
                .courseCode(exam.getCourseCode())
                .durationInMinutes(exam.getDurationInMinutes())
                .totalMarks(exam.getTotalMarks())
                .startTime(exam.getStartTime())
                .endTime(exam.getEndTime())
                .status(exam.getStatus())
                .published(exam.getPublished())
                .createdBy(exam.getCreatedBy())
                .build();
    }

    public static void updateEntity(Exam exam, UpdateExamRequest request) {

        exam.setTitle(request.getTitle());
        exam.setDescription(request.getDescription());
        exam.setSubject(request.getSubject());
        exam.setCourseCode(request.getCourseCode());
        exam.setDurationInMinutes(request.getDurationInMinutes());
        exam.setTotalMarks(request.getTotalMarks());
        exam.setStartTime(request.getStartTime());
        exam.setEndTime(request.getEndTime());
    }
}