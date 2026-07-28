package com.aiexam.service.impl;

import com.aiexam.entity.Exam;
import com.aiexam.entity.Question;
import com.aiexam.exception.BadRequestException;
import com.aiexam.pdf.PdfGenerator;
import com.aiexam.repository.ExamRepository;
import com.aiexam.repository.QuestionRepository;
import com.aiexam.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;

    @Override
    public byte[] generateQuestionPaper(String examId) {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() ->
                        new BadRequestException("Exam not found."));

        List<Question> questions =
                questionRepository.findByExamIdAndActiveTrue(examId);

        return new byte[0];
    }
}