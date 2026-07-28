package com.aiexam.controller;

import com.aiexam.dto.ExamBlueprintRequest;
import com.aiexam.dto.ExamPaperRequest;
import com.aiexam.dto.ExamPaperResponse;
import com.aiexam.service.ExamPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/exam-paper")
@RequiredArgsConstructor
public class AIExamPaperController {

    private final ExamPaperService examPaperService;

    @PostMapping("/generate")
    public ResponseEntity<ExamPaperResponse> generate(
            @RequestBody ExamPaperRequest request
    ) {

        return ResponseEntity.ok(
                examPaperService.generateExamPaper(request)
        );

    }

    @PostMapping("/generate-blueprint")
    public ResponseEntity<ExamPaperResponse> generateBlueprint(
            @RequestBody ExamBlueprintRequest request
    ) {

        return ResponseEntity.ok(
                examPaperService.generateFromBlueprint(request)
        );

    }

}