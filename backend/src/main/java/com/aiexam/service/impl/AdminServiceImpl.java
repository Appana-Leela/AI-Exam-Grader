package com.aiexam.service.impl;

import com.aiexam.dto.admin.AdminDashboardResponse;
import com.aiexam.enums.ExamStatus;
import com.aiexam.enums.Role;
import com.aiexam.repository.ExamRepository;
import com.aiexam.repository.UserRepository;
import com.aiexam.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    private final ExamRepository examRepository;

    // ==========================================================
    // Dashboard
    // ==========================================================

    @Override
    public AdminDashboardResponse getDashboard() {

        return AdminDashboardResponse.builder()

                .totalTeachers(
                        userRepository.countByRoleAndDeletedFalse(Role.TEACHER)
                )

                .totalStudents(
                        userRepository.countByRoleAndDeletedFalse(Role.STUDENT)
                )

                .totalExams(
                        examRepository.count()
                )

                .totalPublishedExams(
                        examRepository.countByPublished(true)
                )

                .totalDraftExams(
                        examRepository.countByStatus(ExamStatus.DRAFT)
                )

                .build();
    }
}