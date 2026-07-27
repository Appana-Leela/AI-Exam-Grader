import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import ProtectedRoute from "./ProtectedRoute";

// =======================
// ADMIN
// =======================
import AdminDashboard from "../pages/admin/Dashboard";
import Teachers from "../pages/admin/Teachers";
import AdminRoutes from "./AdminRoutes";
// =======================
// TEACHER
// =======================
import TeacherDashboard from "../pages/teacher/Dashboard";
import Exams from "../pages/teacher/Exams";
import Questions from "../pages/teacher/Questions";
import TeacherAttempts from "../pages/teacher/TeacherAttempts";
import TeacherEvaluation from "../pages/teacher/TeacherEvaluation";

// =======================
// STUDENT
// =======================
import StudentDashboard from "../pages/student/Dashboard";
import StudentExams from "../pages/student/StudentExams";
import StudentExamPage from "../pages/student/StudentExamPage";
import StudentAttempts from "../pages/student/StudentAttempts";
import StudentResultDetails from "../pages/student/StudentResultDetails";

export default function AppRouter() {

    return (

        <Routes>

            {/* Default Route */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Authentication */}

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
            />

            {/* =======================
                    ADMIN
            ======================== */}

            <Route
                path="/admin/*"
                element={<AdminRoutes />}
            />

            {/* =======================
                    TEACHER
            ======================== */}

            <Route
                path="/teacher/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                        <TeacherDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher/exams"
                element={
                    <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                        <Exams />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher/questions/:examId"
                element={
                    <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                        <Questions />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher/exams/:examId/attempts"
                element={
                    <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                        <TeacherAttempts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/teacher/attempts/:attemptId/evaluate"
                element={
                    <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
                        <TeacherEvaluation />
                    </ProtectedRoute>
                }
            />

            {/* =======================
                    STUDENT
            ======================== */}

            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/exams"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <StudentExams />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/exam/:attemptId"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <StudentExamPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/attempts"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <StudentAttempts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/results/:attemptId"
                element={
                    <ProtectedRoute allowedRoles={["STUDENT"]}>
                        <StudentResultDetails />
                    </ProtectedRoute>
                }
            />

            {/* Unauthorized Page */}

            <Route
                path="/unauthorized"
                element={
                    <div className="flex items-center justify-center min-h-screen">
                        <h1 className="text-3xl font-bold text-red-600">
                            403 - Unauthorized
                        </h1>
                    </div>
                }
            />

            {/* Catch All */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}