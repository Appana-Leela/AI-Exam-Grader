package com.aiexam.controller;

import com.aiexam.dto.admin.CreateStudentRequest;
import com.aiexam.dto.admin.StudentResponse;
import com.aiexam.dto.admin.UpdateStudentRequest;
import com.aiexam.service.StudentManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StudentManagementController {

    private final StudentManagementService studentManagementService;

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {

        return ResponseEntity.ok(
                studentManagementService.getAllStudents()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                studentManagementService.getStudentById(id)
        );
    }

    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(
            @Valid @RequestBody CreateStudentRequest request) {

        StudentResponse student =
                studentManagementService.createStudent(request);

        return ResponseEntity.ok(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable String id,
            @Valid @RequestBody UpdateStudentRequest request) {

        StudentResponse student =
                studentManagementService.updateStudent(id, request);

        return ResponseEntity.ok(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable String id) {

        studentManagementService.deleteStudent(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/enable")
    public ResponseEntity<Void> enableStudent(
            @PathVariable String id) {

        studentManagementService.enableStudent(id);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disableStudent(
            @PathVariable String id) {

        studentManagementService.disableStudent(id);

        return ResponseEntity.ok().build();
    }

}