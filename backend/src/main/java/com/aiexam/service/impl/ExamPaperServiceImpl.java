package com.aiexam.service.impl;

import com.aiexam.dto.ExamBlueprintRequest;
import com.aiexam.dto.ExamPaperRequest;
import com.aiexam.dto.ExamPaperResponse;
import com.aiexam.entity.Question;
import com.aiexam.enums.DifficultyLevel;
import com.aiexam.repository.QuestionRepository;
import com.aiexam.service.ExamPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamPaperServiceImpl implements ExamPaperService {

    private final QuestionRepository questionRepository;

    @Override
    public ExamPaperResponse generateExamPaper(
            ExamPaperRequest request
    ) {

        if (request.getEasyQuestions()
                + request.getMediumQuestions()
                + request.getHardQuestions()
                != request.getTotalQuestions()) {

            throw new RuntimeException(
                    "Question distribution does not match total questions."
            );

        }

        List<Question> selected = new ArrayList<>();

        addQuestions(
                selected,
                request.getSubjectId(),
                DifficultyLevel.EASY,
                request.getEasyQuestions()
        );

        addQuestions(
                selected,
                request.getSubjectId(),
                DifficultyLevel.MEDIUM,
                request.getMediumQuestions()
        );

        addQuestions(
                selected,
                request.getSubjectId(),
                DifficultyLevel.HARD,
                request.getHardQuestions()
        );

        Collections.shuffle(selected);

        return ExamPaperResponse.builder()
                .questions(selected)
                .totalMarks(request.getTotalMarks())
                .totalQuestions(selected.size())
                .build();
    }

    private void addQuestions(
            List<Question> result,
            String subjectId,
            DifficultyLevel level,
            int count
    ) {

        List<Question> pool =
                questionRepository.findBySubjectIdAndDifficultyLevelAndActiveTrue(
                        subjectId,
                        level
                );

        Collections.shuffle(pool);

        result.addAll(
                pool.stream()
                        .limit(count)
                        .toList()
        );

    }


    @Override
    public ExamPaperResponse generateFromBlueprint(
            ExamBlueprintRequest request
    ) {

        return ExamPaperResponse.builder()
                .totalMarks(request.getTotalMarks())
                .totalQuestions(request.getTotalQuestions())
                .questions(new ArrayList<>())
                .build();

    }

}