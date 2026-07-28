package com.aiexam.repository;

import com.aiexam.entity.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends MongoRepository<Subject, String> {

    List<Subject> findByDeletedFalseOrderBySubjectNameAsc();

    boolean existsBySubjectCodeAndDeletedFalse(String subjectCode);

    Optional<Subject> findBySubjectCode(String subjectCode);

    long countByDeletedFalse();

    long countByDeletedFalseAndEnabledTrue();

}