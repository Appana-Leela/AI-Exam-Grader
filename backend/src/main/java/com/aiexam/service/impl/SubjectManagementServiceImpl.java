package com.aiexam.service.impl;

import com.aiexam.dto.admin.CreateSubjectRequest;
import com.aiexam.dto.admin.SubjectResponse;
import com.aiexam.dto.admin.UpdateSubjectRequest;
import com.aiexam.entity.Course;
import com.aiexam.entity.Subject;
import com.aiexam.exception.ResourceNotFoundException;
import com.aiexam.repository.CourseRepository;
import com.aiexam.repository.SubjectRepository;
import com.aiexam.service.SubjectManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectManagementServiceImpl implements SubjectManagementService {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;

    @Override
    public List<SubjectResponse> getAllSubjects() {

        return subjectRepository.findByDeletedFalseOrderBySubjectNameAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SubjectResponse getSubjectById(String id) {

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subject not found."));

        return mapToResponse(subject);
    }

    @Override
    public SubjectResponse createSubject(CreateSubjectRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        if (course.getDeleted()) {
            throw new IllegalArgumentException("Selected course has been deleted.");
        }

        Subject existing = subjectRepository.findBySubjectCode(request.getSubjectCode())
                .orElse(null);

        if (existing != null) {

            if (!existing.getDeleted()) {
                throw new IllegalArgumentException("Subject code already exists.");
            }

            existing.setSubjectName(request.getSubjectName());
            existing.setDescription(request.getDescription());
            existing.setCredits(request.getCredits());
            existing.setSemester(request.getSemester());
            existing.setCourseId(course.getId());
            existing.setCourseName(course.getCourseName());
            existing.setEnabled(true);
            existing.setDeleted(false);

            return mapToResponse(subjectRepository.save(existing));
        }

        Subject subject = Subject.builder()
                .subjectCode(request.getSubjectCode())
                .subjectName(request.getSubjectName())
                .description(request.getDescription())
                .credits(request.getCredits())
                .semester(request.getSemester())
                .courseId(course.getId())
                .courseName(course.getCourseName())
                .enabled(true)
                .deleted(false)
                .build();

        return mapToResponse(subjectRepository.save(subject));
    }

    @Override
    public SubjectResponse updateSubject(String id,
                                         UpdateSubjectRequest request) {

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subject not found."));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        if (!subject.getSubjectCode().equals(request.getSubjectCode())) {

            if (subjectRepository.existsBySubjectCodeAndDeletedFalse(request.getSubjectCode())) {
                throw new IllegalArgumentException("Subject code already exists.");
            }

            subject.setSubjectCode(request.getSubjectCode());
        }

        subject.setSubjectName(request.getSubjectName());
        subject.setDescription(request.getDescription());
        subject.setCredits(request.getCredits());
        subject.setSemester(request.getSemester());
        subject.setCourseId(course.getId());
        subject.setCourseName(course.getCourseName());

        if (request.getEnabled() != null) {
            subject.setEnabled(request.getEnabled());
        }

        return mapToResponse(subjectRepository.save(subject));
    }

    @Override
    public void deleteSubject(String id) {

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subject not found."));

        subject.setDeleted(true);

        subjectRepository.save(subject);
    }

    @Override
    public void enableSubject(String id) {

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subject not found."));

        subject.setEnabled(true);

        subjectRepository.save(subject);
    }

    @Override
    public void disableSubject(String id) {

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Subject not found."));

        subject.setEnabled(false);

        subjectRepository.save(subject);
    }

    private SubjectResponse mapToResponse(Subject subject) {

        return SubjectResponse.builder()
                .id(subject.getId())
                .subjectCode(subject.getSubjectCode())
                .subjectName(subject.getSubjectName())
                .description(subject.getDescription())
                .credits(subject.getCredits())
                .semester(subject.getSemester())
                .courseId(subject.getCourseId())
                .courseName(subject.getCourseName())
                .enabled(subject.getEnabled())
                .deleted(subject.getDeleted())
                .build();
    }

}