package com.aiexam.service.impl;

import com.aiexam.dto.CreateExamRequest;
import com.aiexam.dto.ExamResponse;
import com.aiexam.dto.UpdateExamRequest;
import com.aiexam.entity.Exam;
import com.aiexam.enums.ExamStatus;
import com.aiexam.exception.ExamNotFoundException;
import com.aiexam.mapper.ExamMapper;
import com.aiexam.repository.ExamRepository;
import com.aiexam.security.SecurityUtils;
import com.aiexam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;
import com.aiexam.exception.BadRequestException;
@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    @Override
    public ExamResponse createExam(CreateExamRequest request) {

        Exam exam = ExamMapper.toEntity(request);

        exam.setCreatedBy(SecurityUtils.getCurrentUserEmail());

        exam.setStatus(ExamStatus.DRAFT);

        exam.setPublished(false);

        return ExamMapper.toResponse(
                examRepository.save(exam)
        );
    }

    @Override
    public ExamResponse updateExam(
            String examId,
            UpdateExamRequest request) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        ExamMapper.updateEntity(exam, request);

        return ExamMapper.toResponse(
                examRepository.save(exam)
        );
    }

    @Override
    public ExamResponse getExamById(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        return ExamMapper.toResponse(exam);
    }

    @Override
    public List<ExamResponse> getAllExams() {

        return examRepository.findAll()
                .stream()
                .map(ExamMapper::toResponse)
                .toList();
    }

    @Override
    public List<ExamResponse> getMyExams() {

        String email = SecurityUtils.getCurrentUserEmail();

        return examRepository.findByCreatedBy(email)
                .stream()
                .map(ExamMapper::toResponse)
                .toList();
    }

    
    @Override
    public void deleteExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        examRepository.delete(exam);
    }

    @Override
    public ExamResponse publishExam(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        exam.setPublished(true);

        exam.setStatus(ExamStatus.SCHEDULED);

        return ExamMapper.toResponse(
                examRepository.save(exam)
        );
    }

    @Override
        public boolean isExamAvailable(String examId) {

        return examRepository.findById(examId)
                .map(exam ->
                        exam.getPublished() &&
                        LocalDateTime.now().isAfter(exam.getStartTime()) &&
                        LocalDateTime.now().isBefore(exam.getEndTime()))
                .orElse(false);
        }

        @Override
        public Exam validateExamForAttempt(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        if (!Boolean.TRUE.equals(exam.getPublished())) {
                throw new BadRequestException("Exam has not been published.");
        }

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(exam.getStartTime())) {
                throw new BadRequestException("Exam has not started yet.");
        }

        if (now.isAfter(exam.getEndTime())) {
                throw new BadRequestException("Exam has already ended.");
        }

        return exam;
        }


       @Override
public List<ExamResponse> getAvailableExams() {

    return examRepository.findByPublished(true)
            .stream()
            .map(ExamMapper::toResponse)
            .toList();

}

}