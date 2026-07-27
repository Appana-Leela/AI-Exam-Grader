package com.aiexam.service;

import com.aiexam.dto.StudentResultResponse;

public interface StudentResultService {

    StudentResultResponse getResult(String attemptId);

}