package com.aiexam.service.impl;

import com.aiexam.dto.admin.AdminDashboardResponse;
import com.aiexam.enums.ExamStatus;
import com.aiexam.enums.Role;
import com.aiexam.repository.CourseRepository;
import com.aiexam.repository.ExamRepository;
import com.aiexam.repository.SubjectRepository;
import com.aiexam.repository.UserRepository;
import com.aiexam.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    private final ExamRepository examRepository;

    private final CourseRepository courseRepository;

    private final SubjectRepository subjectRepository;

    @Override
    public AdminDashboardResponse getDashboard() {

        return AdminDashboardResponse.builder()

                // ==========================
                // Teachers
                // ==========================
                .totalTeachers(
                        userRepository.countByRoleAndDeletedFalse(Role.TEACHER)
                )

                .activeTeachers(
                        userRepository.countByRoleAndDeletedFalseAndEnabledTrue(Role.TEACHER)
                )

                // ==========================
                // Students
                // ==========================
                .totalStudents(
                        userRepository.countByRoleAndDeletedFalse(Role.STUDENT)
                )

                .activeStudents(
                        userRepository.countByRoleAndDeletedFalseAndEnabledTrue(Role.STUDENT)
                )

                // ==========================
                // Courses
                // ==========================
                .totalCourses(
                        courseRepository.countByDeletedFalse()
                )

                .activeCourses(
                        courseRepository.countByDeletedFalseAndEnabledTrue()
                )

                // ==========================
                // Subjects
                // ==========================
                .totalSubjects(
                        subjectRepository.countByDeletedFalse()
                )

                .activeSubjects(
                        subjectRepository.countByDeletedFalseAndEnabledTrue()
                )

                // ==========================
                // Exams
                // ==========================
                .totalExams(
                        examRepository.countByDeletedFalse()
                )

                .draftExams(
                        examRepository.countByStatusAndDeletedFalse(ExamStatus.DRAFT)
                )

                .scheduledExams(
                        examRepository.countByStatusAndDeletedFalse(ExamStatus.SCHEDULED)
                )

                .ongoingExams(
                        examRepository.countByStatusAndDeletedFalse(ExamStatus.ONGOING)
                )

                .completedExams(
                        examRepository.countByStatusAndDeletedFalse(ExamStatus.COMPLETED)
                )

                .cancelledExams(
                        examRepository.countByStatusAndDeletedFalse(ExamStatus.CANCELLED)
                )

                .publishedExams(
                        examRepository.countByDeletedFalseAndPublishedTrue()
                )

                .build();
    }

}