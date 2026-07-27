package com.aiexam.repository;

import com.aiexam.entity.ExamAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import com.aiexam.enums.AttemptStatus;


public interface ExamAttemptRepository
        extends MongoRepository<ExamAttempt, String> {

    Optional<ExamAttempt> findByExamIdAndStudentEmail(
            String examId,
            String studentEmail);

    List<ExamAttempt> findByStudentEmail(String studentEmail);

    List<ExamAttempt> findByExamId(String examId);
    List<ExamAttempt> findByExamIdAndStatus(
        String examId,
        AttemptStatus status
        );

        long countByExamId(String examId);

        long countByExamIdAndStatus(
                String examId,
                AttemptStatus status
        );
        List<ExamAttempt> findAllByStudentEmailNotNull();
}