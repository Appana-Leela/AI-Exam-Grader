package com.aiexam.service;

import com.aiexam.dto.admin.CreateStudentRequest;
import com.aiexam.dto.admin.StudentResponse;
import com.aiexam.dto.admin.UpdateStudentRequest;

import java.util.List;

public interface StudentManagementService {

    List<StudentResponse> getAllStudents();

    StudentResponse getStudentById(String id);

    StudentResponse createStudent(CreateStudentRequest request);

    StudentResponse updateStudent(String id, UpdateStudentRequest request);

    void deleteStudent(String id);

    void enableStudent(String id);

    void disableStudent(String id);

}