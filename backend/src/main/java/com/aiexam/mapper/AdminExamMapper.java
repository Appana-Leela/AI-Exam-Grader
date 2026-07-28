package com.aiexam.mapper;

import com.aiexam.dto.admin.AdminExamResponse;
import com.aiexam.dto.admin.CreateAdminExamRequest;
import com.aiexam.dto.admin.UpdateAdminExamRequest;
import com.aiexam.entity.Exam;
import org.springframework.stereotype.Component;

@Component
public class AdminExamMapper {

    /**
     * Convert Create Request -> Exam Entity
     */
    public Exam toEntity(CreateAdminExamRequest request) {

        return Exam.builder()

                // ==========================
                // Legacy Fields
                // ==========================
                .title(request.getExamName())
                .description(request.getDescription())
                .subject(request.getSubjectName())
                .courseCode(request.getCourseCode())
                .createdBy(request.getTeacherEmail())

                // ==========================
                // Admin Fields
                // ==========================
                .examCode(request.getExamCode())
                .examName(request.getExamName())

                .courseId(request.getCourseId())
                .courseName(request.getCourseName())

                .subjectId(request.getSubjectId())
                .subjectCode(request.getSubjectCode())
                .subjectName(request.getSubjectName())

                .teacherId(request.getTeacherId())
                .teacherName(request.getTeacherName())
                .teacherEmail(request.getTeacherEmail())

                .semester(request.getSemester())
                .section(request.getSection())
                .academicYear(request.getAcademicYear())

                .examType(request.getExamType())

                .durationInMinutes(request.getDurationInMinutes())
                .totalMarks(request.getTotalMarks())
                .passingMarks(request.getPassingMarks())

                .startTime(request.getStartTime())
                .endTime(request.getEndTime())

                .instructions(request.getInstructions())

                .build();
    }

    /**
     * Update Existing Exam
     */
    public void updateEntity(Exam exam, UpdateAdminExamRequest request) {

        // Legacy Fields
        exam.setTitle(request.getExamName());
        exam.setDescription(request.getDescription());
        exam.setSubject(request.getSubjectName());
        exam.setCourseCode(request.getCourseCode());
        exam.setCreatedBy(request.getTeacherEmail());

        // Admin Fields
        exam.setExamName(request.getExamName());

        exam.setCourseId(request.getCourseId());
        exam.setCourseName(request.getCourseName());

        exam.setSubjectId(request.getSubjectId());
        exam.setSubjectCode(request.getSubjectCode());
        exam.setSubjectName(request.getSubjectName());

        exam.setTeacherId(request.getTeacherId());
        exam.setTeacherName(request.getTeacherName());
        exam.setTeacherEmail(request.getTeacherEmail());

        exam.setSemester(request.getSemester());
        exam.setSection(request.getSection());
        exam.setAcademicYear(request.getAcademicYear());

        exam.setExamType(request.getExamType());

        exam.setDurationInMinutes(request.getDurationInMinutes());
        exam.setTotalMarks(request.getTotalMarks());
        exam.setPassingMarks(request.getPassingMarks());

        exam.setStartTime(request.getStartTime());
        exam.setEndTime(request.getEndTime());

        exam.setInstructions(request.getInstructions());
    }

    /**
     * Entity -> Response DTO
     */
    public AdminExamResponse toResponse(Exam exam) {

        return AdminExamResponse.builder()

                .id(exam.getId())

                .examCode(exam.getExamCode())
                .examName(exam.getExamName())

                .description(exam.getDescription())

                .courseId(exam.getCourseId())
                .courseName(exam.getCourseName())
                .courseCode(exam.getCourseCode())

                .subjectId(exam.getSubjectId())
                .subjectName(exam.getSubjectName())
                .subjectCode(exam.getSubjectCode())

                .teacherId(exam.getTeacherId())
                .teacherName(exam.getTeacherName())
                .teacherEmail(exam.getTeacherEmail())

                .semester(exam.getSemester())
                .section(exam.getSection())
                .academicYear(exam.getAcademicYear())

                .examType(exam.getExamType())

                .durationInMinutes(exam.getDurationInMinutes())
                .totalMarks(exam.getTotalMarks())
                .passingMarks(exam.getPassingMarks())

                .startTime(exam.getStartTime())
                .endTime(exam.getEndTime())

                .instructions(exam.getInstructions())

                .status(exam.getStatus())
                .published(exam.getPublished())
                .enabled(exam.getEnabled())
                .deleted(exam.getDeleted())

                .createdAt(exam.getCreatedAt())
                .updatedAt(exam.getUpdatedAt())

                .build();
    }
}