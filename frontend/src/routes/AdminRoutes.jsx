import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Teachers from "../pages/admin/Teachers";
import Students from "../pages/admin/Students";
import Courses from "../pages/admin/Courses";
import Subjects from "../pages/admin/Subjects";

export default function AdminRoutes() {

    return (

        <Routes>

            <Route
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={<Navigate to="dashboard" replace />}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="teachers"
                    element={<Teachers />}
                />

                <Route
                    path="students"
                    element={<Students />}
                />

                <Route
                    path="courses"
                    element={<Courses />}
                />

                <Route
                    path="subjects"
                    element={<Subjects />}
                />

                <Route
                    path="exams"
                    element={
                        <div className="text-2xl font-bold">
                            Exams Page (Coming Soon)
                        </div>
                    }
                />

                <Route
                    path="analytics"
                    element={
                        <div className="text-2xl font-bold">
                            Analytics Page (Coming Soon)
                        </div>
                    }
                />

                <Route
                    path="settings"
                    element={
                        <div className="text-2xl font-bold">
                            Settings Page (Coming Soon)
                        </div>
                    }
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
            />

        </Routes>

    );

}