package com.aiexam.service;

import com.aiexam.dto.admin.CourseResponse;
import com.aiexam.dto.admin.CreateCourseRequest;
import com.aiexam.dto.admin.UpdateCourseRequest;

import java.util.List;

public interface CourseManagementService {

    List<CourseResponse> getAllCourses();

    CourseResponse getCourseById(String id);

    CourseResponse createCourse(CreateCourseRequest request);

    CourseResponse updateCourse(String id,
                                UpdateCourseRequest request);

    void deleteCourse(String id);

    void enableCourse(String id);

    void disableCourse(String id);

}