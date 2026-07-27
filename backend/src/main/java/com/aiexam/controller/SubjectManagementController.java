package com.aiexam.controller;

import com.aiexam.dto.admin.CreateSubjectRequest;
import com.aiexam.dto.admin.SubjectResponse;
import com.aiexam.dto.admin.UpdateSubjectRequest;
import com.aiexam.service.SubjectManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subjects")
@RequiredArgsConstructor
public class SubjectManagementController {

    private final SubjectManagementService subjectManagementService;

    @GetMapping
    public ResponseEntity<List<SubjectResponse>> getAllSubjects() {

        return ResponseEntity.ok(
                subjectManagementService.getAllSubjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> getSubject(
            @PathVariable String id) {

        return ResponseEntity.ok(
                subjectManagementService.getSubjectById(id));
    }

    @PostMapping
    public ResponseEntity<SubjectResponse> createSubject(
            @Valid @RequestBody CreateSubjectRequest request) {

        return ResponseEntity.ok(
                subjectManagementService.createSubject(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectResponse> updateSubject(
            @PathVariable String id,
            @Valid @RequestBody UpdateSubjectRequest request) {

        return ResponseEntity.ok(
                subjectManagementService.updateSubject(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(
            @PathVariable String id) {

        subjectManagementService.deleteSubject(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/enable")
    public ResponseEntity<Void> enableSubject(
            @PathVariable String id) {

        subjectManagementService.enableSubject(id);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disableSubject(
            @PathVariable String id) {

        subjectManagementService.disableSubject(id);

        return ResponseEntity.ok().build();
    }

}