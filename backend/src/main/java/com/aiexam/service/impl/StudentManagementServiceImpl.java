package com.aiexam.service.impl;

import com.aiexam.dto.admin.CreateStudentRequest;
import com.aiexam.dto.admin.StudentResponse;
import com.aiexam.dto.admin.UpdateStudentRequest;
import com.aiexam.entity.User;
import com.aiexam.enums.Role;
import com.aiexam.exception.ResourceNotFoundException;
import com.aiexam.repository.UserRepository;
import com.aiexam.service.StudentManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentManagementServiceImpl implements StudentManagementService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<StudentResponse> getAllStudents() {

        return userRepository.findByRoleAndDeletedFalseOrderByFirstNameAsc(Role.STUDENT)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public StudentResponse getStudentById(String id) {

        User student = userRepository.findById(id)
        .filter(user -> user.getRole() == Role.STUDENT)
        .orElseThrow(() ->
                new ResourceNotFoundException("Student not found."));

        return mapToResponse(student);
    }

    @Override
    public StudentResponse createStudent(CreateStudentRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User student = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .department(request.getDepartment())
                .rollNumber(request.getRollNumber())
                .year(request.getYear())
                .section(request.getSection())
                .role(Role.STUDENT)
                .enabled(true)
                .deleted(false)
                .accountLocked(false)
                .emailVerified(true)
                .build();

        return mapToResponse(userRepository.save(student));
    }

    @Override
    public StudentResponse updateStudent(String id,
                                         UpdateStudentRequest request) {

        User student = userRepository.findById(id)
        .filter(user -> user.getRole() == Role.STUDENT)
        .orElseThrow(() ->
                new ResourceNotFoundException("Student not found."));

        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        if (!student.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new IllegalArgumentException("Email already exists.");
        }

        student.setEmail(request.getEmail());
                student.setPhone(request.getPhone());
                student.setDepartment(request.getDepartment());
                student.setRollNumber(request.getRollNumber());
                student.setYear(request.getYear());
                student.setSection(request.getSection());

                if (request.getEnabled() != null) {
                    student.setEnabled(request.getEnabled());
                }

                return mapToResponse(userRepository.save(student));
            }

    @Override
    public void deleteStudent(String id) {

        User student = userRepository.findById(id)
        .filter(user -> user.getRole() == Role.STUDENT)
        .orElseThrow(() ->
                new ResourceNotFoundException("Student not found."));

        student.setDeleted(true);

        userRepository.save(student);
    }

    @Override
    public void enableStudent(String id) {

        User student = userRepository.findById(id)
        .filter(user -> user.getRole() == Role.STUDENT)
        .orElseThrow(() ->
                new ResourceNotFoundException("Student not found."));

        student.setEnabled(true);

        userRepository.save(student);
    }

    @Override
    public void disableStudent(String id) {

        User student = userRepository.findById(id)
        .filter(user -> user.getRole() == Role.STUDENT)
        .orElseThrow(() ->
                new ResourceNotFoundException("Student not found."));

        student.setEnabled(false);

        userRepository.save(student);
    }

    private StudentResponse mapToResponse(User student) {

        return StudentResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .department(student.getDepartment())
                .rollNumber(student.getRollNumber())
                .year(student.getYear())
                .section(student.getSection())
                .enabled(student.getEnabled())
                .deleted(student.getDeleted())
                .build();
    }
}