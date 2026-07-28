package com.aiexam.controller;

import com.aiexam.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PdfController {

    private final PdfService pdfService;

    @GetMapping("/question-paper/{examId}")
    public ResponseEntity<byte[]> download(
            @PathVariable String examId
    ) {

        byte[] pdf = pdfService.generateQuestionPaper(examId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=question-paper.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);

    }

}