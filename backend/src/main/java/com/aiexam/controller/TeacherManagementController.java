package com.aiexam.controller;

import com.aiexam.dto.admin.CreateTeacherRequest;
import com.aiexam.dto.admin.TeacherResponse;
import com.aiexam.dto.admin.UpdateTeacherRequest;
import com.aiexam.service.TeacherManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/teachers")
@RequiredArgsConstructor
public class TeacherManagementController {

    private final TeacherManagementService teacherManagementService;

    @GetMapping
    public ResponseEntity<List<TeacherResponse>> getAllTeachers() {

        return ResponseEntity.ok(
                teacherManagementService.getAllTeachers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponse> getTeacher(
            @PathVariable String id) {

        return ResponseEntity.ok(
                teacherManagementService.getTeacherById(id));
    }

    @PostMapping
    public ResponseEntity<TeacherResponse> createTeacher(
            @Valid @RequestBody CreateTeacherRequest request) {

        return ResponseEntity.ok(
                teacherManagementService.createTeacher(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherResponse> updateTeacher(
            @PathVariable String id,
            @Valid @RequestBody UpdateTeacherRequest request) {

        return ResponseEntity.ok(
                teacherManagementService.updateTeacher(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(
            @PathVariable String id) {

        teacherManagementService.deleteTeacher(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/enable")
    public ResponseEntity<Void> enableTeacher(
            @PathVariable String id) {

        teacherManagementService.enableTeacher(id);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disableTeacher(
            @PathVariable String id) {

        teacherManagementService.disableTeacher(id);

        return ResponseEntity.ok().build();
    }

}