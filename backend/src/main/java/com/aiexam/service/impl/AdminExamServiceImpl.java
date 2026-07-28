package com.aiexam.service.impl;

import com.aiexam.dto.admin.AdminExamResponse;
import com.aiexam.dto.admin.CreateAdminExamRequest;
import com.aiexam.dto.admin.UpdateAdminExamRequest;
import com.aiexam.entity.Exam;
import com.aiexam.enums.ExamStatus;
import com.aiexam.exception.BadRequestException;
import com.aiexam.exception.ExamNotFoundException;
import com.aiexam.mapper.AdminExamMapper;
import com.aiexam.repository.ExamRepository;
import com.aiexam.service.AdminExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminExamServiceImpl implements AdminExamService {

    private final ExamRepository examRepository;
    private final AdminExamMapper adminExamMapper;

    @Override
    public AdminExamResponse createExam(CreateAdminExamRequest request) {

        if (examRepository.existsByExamCode(request.getExamCode())) {
            throw new BadRequestException(
                    "Exam Code already exists : " + request.getExamCode());
        }

        Exam exam = adminExamMapper.toEntity(request);

        exam.setStatus(ExamStatus.DRAFT);
        exam.setPublished(false);
        exam.setEnabled(true);
        exam.setDeleted(false);

        Exam savedExam = examRepository.save(exam);

        return adminExamMapper.toResponse(savedExam);
    }

    @Override
    public AdminExamResponse updateExam(String examId,
                                        UpdateAdminExamRequest request) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found"));

        adminExamMapper.updateEntity(exam, request);

        Exam updatedExam = examRepository.save(exam);

        return adminExamMapper.toResponse(updatedExam);
    }

    @Override
    public AdminExamResponse getExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found"));

        return adminExamMapper.toResponse(exam);
    }

    @Override
    public List<AdminExamResponse> getAllExams() {

        return examRepository.findByDeletedFalse()
                .stream()
                .map(adminExamMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found"));

        exam.setDeleted(true);

        examRepository.save(exam);
    }

    @Override
    public AdminExamResponse publishExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found"));

        exam.setPublished(true);
        exam.setStatus(ExamStatus.SCHEDULED);

        Exam savedExam = examRepository.save(exam);

        return adminExamMapper.toResponse(savedExam);
    }

    @Override
    public AdminExamResponse archiveExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found"));

        exam.setEnabled(false);
        exam.setStatus(ExamStatus.COMPLETED);

        Exam savedExam = examRepository.save(exam);

        return adminExamMapper.toResponse(savedExam);
    }

}