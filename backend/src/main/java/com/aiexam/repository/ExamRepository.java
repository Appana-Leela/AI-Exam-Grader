package com.aiexam.repository;

import com.aiexam.entity.Exam;
import com.aiexam.enums.ExamStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExamRepository extends MongoRepository<Exam, String> {

    // ===========================
    // Teacher Module
    // ===========================

    List<Exam> findByCreatedBy(String createdBy);

    List<Exam> findByPublished(Boolean published);

    long countByCreatedBy(String createdBy);

    long countByCreatedByAndPublishedTrue(String createdBy);

    // ===========================
    // Admin Dashboard
    // ===========================

    long countByPublished(Boolean published);

    long countByStatus(ExamStatus status);

    // ===========================
    // Search
    // ===========================

    List<Exam> findBySubject(String subject);

    List<Exam> findByCourseCode(String courseCode);
}