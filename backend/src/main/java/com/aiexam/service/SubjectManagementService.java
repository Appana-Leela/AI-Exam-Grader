package com.aiexam.service;

import com.aiexam.dto.admin.CreateSubjectRequest;
import com.aiexam.dto.admin.SubjectResponse;
import com.aiexam.dto.admin.UpdateSubjectRequest;

import java.util.List;

public interface SubjectManagementService {

    List<SubjectResponse> getAllSubjects();

    SubjectResponse getSubjectById(String id);

    SubjectResponse createSubject(CreateSubjectRequest request);

    SubjectResponse updateSubject(String id, UpdateSubjectRequest request);

    void deleteSubject(String id);

    void enableSubject(String id);

    void disableSubject(String id);

}