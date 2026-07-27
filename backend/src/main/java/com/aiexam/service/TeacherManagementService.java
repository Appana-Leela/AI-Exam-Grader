package com.aiexam.service;

import com.aiexam.dto.admin.CreateTeacherRequest;
import com.aiexam.dto.admin.TeacherPageResponse;
import com.aiexam.dto.admin.TeacherResponse;
import com.aiexam.dto.admin.UpdateTeacherRequest;

import java.util.List;

public interface TeacherManagementService {

    List<TeacherResponse> getAllTeachers();

    TeacherResponse getTeacherById(String id);

    TeacherResponse createTeacher(CreateTeacherRequest request);

    TeacherResponse updateTeacher(
            String id,
            UpdateTeacherRequest request);

    // TeacherPageResponse getTeachers(
    //     int page,
    //     int size,
    //     String search,
    //     String sortBy,
    //     String direction);    

    void deleteTeacher(String id);

    void enableTeacher(String id);

    void disableTeacher(String id);

}