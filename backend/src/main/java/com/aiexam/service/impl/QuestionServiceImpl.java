package com.aiexam.service.impl;

import com.aiexam.dto.CreateQuestionRequest;
import com.aiexam.dto.QuestionResponse;
import com.aiexam.dto.UpdateQuestionRequest;
import com.aiexam.entity.Exam;
import com.aiexam.entity.Question;
import com.aiexam.exception.ExamNotFoundException;
import com.aiexam.exception.QuestionNotFoundException;
import com.aiexam.mapper.QuestionMapper;
import com.aiexam.repository.ExamRepository;
import com.aiexam.repository.QuestionRepository;
import com.aiexam.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;

    @Override
    public QuestionResponse createQuestion(CreateQuestionRequest request) {

        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() ->
                        new ExamNotFoundException("Exam not found."));

        Question question = QuestionMapper.toEntity(request);

        return QuestionMapper.toResponse(
                questionRepository.save(question)
        );
    }

    

    @Override
    public QuestionResponse updateQuestion(
            String questionId,
            UpdateQuestionRequest request) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() ->
                        new QuestionNotFoundException("Question not found."));

        QuestionMapper.updateEntity(question, request);

        return QuestionMapper.toResponse(
                questionRepository.save(question)
        );
    }

    @Override
    public QuestionResponse getQuestionById(String questionId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() ->
                        new QuestionNotFoundException("Question not found."));

        return QuestionMapper.toResponse(question);
    }

    @Override
    public List<QuestionResponse> getQuestionsByExam(String examId) {

        return questionRepository.findByExamIdAndActiveTrue(examId)
                .stream()
                .map(QuestionMapper::toResponse)
                .toList();
    }

    @Override
    public List<QuestionResponse> getAllQuestions() {

        return questionRepository.findAll()
                .stream()
                .map(QuestionMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteQuestion(String questionId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() ->
                        new QuestionNotFoundException("Question not found."));

        question.setActive(false);

        questionRepository.save(question);
    }
}