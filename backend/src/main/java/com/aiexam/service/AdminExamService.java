package com.aiexam.service;

import com.aiexam.dto.admin.AdminExamResponse;
import com.aiexam.dto.admin.CreateAdminExamRequest;
import com.aiexam.dto.admin.UpdateAdminExamRequest;

import java.util.List;

public interface AdminExamService {

    AdminExamResponse createExam(CreateAdminExamRequest request);

    AdminExamResponse updateExam(String examId,
                                 UpdateAdminExamRequest request);

    AdminExamResponse getExam(String examId);

    List<AdminExamResponse> getAllExams();

    void deleteExam(String examId);

    AdminExamResponse publishExam(String examId);

    AdminExamResponse archiveExam(String examId);

}