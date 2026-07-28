package com.aiexam.repository;

import com.aiexam.entity.Question;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.enums.QuestionType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends MongoRepository<Question, String> {

    Optional<Question> findByIdAndActiveTrue(String id);

    List<Question> findByExamId(String examId);

    List<Question> findByExamIdAndActiveTrue(String examId);

    List<Question> findByCourseId(String courseId);

    List<Question> findBySubjectId(String subjectId);

    List<Question> findByTeacherId(String teacherId);

    List<Question> findByDifficultyLevel(DifficultyLevel difficultyLevel);

    List<Question> findByQuestionType(QuestionType questionType);

    List<Question> findByActiveTrue();

    long countByExamId(String examId);

    long countByActiveTrue();

    

List<Question> findBySubjectIdAndDifficultyLevelAndActiveTrue(
        String subjectId,
        DifficultyLevel difficultyLevel
);

List<Question> findBySubjectIdAndActiveTrue(
        String subjectId
);

}