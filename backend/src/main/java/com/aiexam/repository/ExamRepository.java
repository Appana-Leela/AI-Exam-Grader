package com.aiexam.repository;

import com.aiexam.entity.Exam;
import com.aiexam.enums.ExamStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<Exam, String> {

    // ==================================================
    // Teacher Module
    // ==================================================

    List<Exam> findByCreatedBy(String createdBy);

    List<Exam> findByPublished(Boolean published);

    long countByCreatedBy(String createdBy);

    long countByCreatedByAndPublishedTrue(String createdBy);

    // ==================================================
    // Admin Dashboard
    // ==================================================

    long countByPublished(Boolean published);

    long countByStatus(ExamStatus status);

    // ==================================================
    // Search
    // ==================================================

    List<Exam> findBySubject(String subject);

    List<Exam> findByCourseCode(String courseCode);

    // ==================================================
    // Admin Exam Module
    // ==================================================

    Optional<Exam> findByExamCode(String examCode);

    boolean existsByExamCode(String examCode);

    List<Exam> findByDeletedFalse();

    List<Exam> findByTeacherId(String teacherId);

    List<Exam> findByCourseId(String courseId);

    List<Exam> findBySubjectId(String subjectId);

    List<Exam> findByStatus(ExamStatus status);

    List<Exam> findByEnabledTrue();

    long countByDeletedFalse();

    long countByDeletedFalseAndPublishedTrue();

    long countByStatusAndDeletedFalse(ExamStatus status);

}