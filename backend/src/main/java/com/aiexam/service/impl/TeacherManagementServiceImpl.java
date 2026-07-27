package com.aiexam.service.impl;

import com.aiexam.dto.admin.CreateTeacherRequest;
import com.aiexam.dto.admin.TeacherResponse;
import com.aiexam.dto.admin.UpdateTeacherRequest;
import com.aiexam.entity.User;
import com.aiexam.enums.Role;
import com.aiexam.exception.BadRequestException;
import com.aiexam.exception.ResourceNotFoundException;
import com.aiexam.mapper.TeacherMapper;
import com.aiexam.repository.UserRepository;
import com.aiexam.service.TeacherManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherManagementServiceImpl implements TeacherManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeacherMapper teacherMapper;

    @Override
    public List<TeacherResponse> getAllTeachers() {

        return userRepository.findByRoleOrderByFirstNameAsc(Role.TEACHER)
                .stream()
                .map(teacherMapper::toResponse)
                .toList();
    }

    @Override
    public TeacherResponse getTeacherById(String id) {

        User teacher = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Teacher not found."));

        if (teacher.getRole() != Role.TEACHER) {
            throw new BadRequestException("User is not a teacher.");
        }

        return teacherMapper.toResponse(teacher);
    }

    @Override
    public TeacherResponse createTeacher(CreateTeacherRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists.");
        }

        User teacher = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .department(request.getDepartment())
                .role(Role.TEACHER)
                .enabled(true)
                .deleted(false)
                .accountLocked(false)
                .emailVerified(true)
                .build();

        teacher = userRepository.save(teacher);

        return teacherMapper.toResponse(teacher);
    }

    @Override
    public TeacherResponse updateTeacher(
            String id,
            UpdateTeacherRequest request) {

        User teacher = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Teacher not found."));

        if (teacher.getRole() != Role.TEACHER) {
            throw new BadRequestException("User is not a teacher.");
        }

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setPhone(request.getPhone());
        teacher.setDepartment(request.getDepartment());

        teacher = userRepository.save(teacher);

        return teacherMapper.toResponse(teacher);
    }

    @Override
    public void deleteTeacher(String id) {

        User teacher = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Teacher not found."));

        if (teacher.getRole() != Role.TEACHER) {
            throw new BadRequestException("User is not a teacher.");
        }

        userRepository.delete(teacher);
    }

    @Override
    public void enableTeacher(String id) {

        User teacher = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Teacher not found."));

        teacher.setEnabled(true);

        userRepository.save(teacher);
    }

    @Override
    public void disableTeacher(String id) {

        User teacher = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Teacher not found."));

        teacher.setEnabled(false);

        userRepository.save(teacher);
    }

}