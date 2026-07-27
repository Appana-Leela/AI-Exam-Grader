package com.aiexam.service.impl;

import com.aiexam.dto.admin.CourseResponse;
import com.aiexam.dto.admin.CreateCourseRequest;
import com.aiexam.dto.admin.UpdateCourseRequest;
import com.aiexam.entity.Course;
import com.aiexam.exception.ResourceNotFoundException;
import com.aiexam.repository.CourseRepository;
import com.aiexam.service.CourseManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseManagementServiceImpl implements CourseManagementService {

    private final CourseRepository courseRepository;

    @Override
    public List<CourseResponse> getAllCourses() {

        return courseRepository.findByDeletedFalseOrderByCourseNameAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponse getCourseById(String id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        return mapToResponse(course);
    }

    @Override
    public CourseResponse createCourse(CreateCourseRequest request) {

        // Check if a course with this code already exists
        Course existing = courseRepository.findByCourseCode(request.getCourseCode())
                .orElse(null);

        if (existing != null) {

            // If active, don't allow duplicate
            if (!existing.getDeleted()) {
                throw new IllegalArgumentException("Course code already exists.");
            }

            // Restore deleted course
            existing.setCourseName(request.getCourseName());
            existing.setDescription(request.getDescription());
            existing.setDuration(request.getDuration());
            existing.setEnabled(true);
            existing.setDeleted(false);

            return mapToResponse(courseRepository.save(existing));
        }

        // Create new course
        Course course = Course.builder()
                .courseCode(request.getCourseCode())
                .courseName(request.getCourseName())
                .description(request.getDescription())
                .duration(request.getDuration())
                .enabled(true)
                .deleted(false)
                .build();

        return mapToResponse(courseRepository.save(course));
    }

    @Override
    public CourseResponse updateCourse(String id,
                                       UpdateCourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        // Check duplicate only if course code is changed
        if (!course.getCourseCode().equals(request.getCourseCode())) {

            if (courseRepository.existsByCourseCodeAndDeletedFalse(request.getCourseCode())) {
                throw new IllegalArgumentException("Course code already exists.");
            }

            course.setCourseCode(request.getCourseCode());
        }

        course.setCourseName(request.getCourseName());
        course.setDescription(request.getDescription());
        course.setDuration(request.getDuration());

        if (request.getEnabled() != null) {
            course.setEnabled(request.getEnabled());
        }

        return mapToResponse(courseRepository.save(course));
    }

    @Override
    public void deleteCourse(String id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        course.setDeleted(true);

        courseRepository.save(course);
    }

    @Override
    public void enableCourse(String id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        course.setEnabled(true);

        courseRepository.save(course);
    }

    @Override
    public void disableCourse(String id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        course.setEnabled(false);

        courseRepository.save(course);
    }

    private CourseResponse mapToResponse(Course course) {

        return CourseResponse.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .courseName(course.getCourseName())
                .description(course.getDescription())
                .duration(course.getDuration())
                .enabled(course.getEnabled())
                .deleted(course.getDeleted())
                .build();
    }
}