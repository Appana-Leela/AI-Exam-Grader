package com.aiexam.repository;

import com.aiexam.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByExamId(String examId);

    List<Question> findByExamIdAndActiveTrue(String examId);

    Optional<Question> findByIdAndActiveTrue(String id);

}