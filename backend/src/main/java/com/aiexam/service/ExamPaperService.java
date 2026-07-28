package com.aiexam.service;

import com.aiexam.dto.ExamBlueprintRequest;
import com.aiexam.dto.ExamPaperRequest;
import com.aiexam.dto.ExamPaperResponse;

public interface ExamPaperService {

    ExamPaperResponse generateExamPaper(
            ExamPaperRequest request
    );

    ExamPaperResponse generateFromBlueprint(
        ExamBlueprintRequest request
    );

}