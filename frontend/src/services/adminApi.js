import api from "../api/axios";

/* ==========================================================
                        DASHBOARD
========================================================== */

export const getDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};

/* ==========================================================
                        TEACHERS
========================================================== */

export const getTeachers = async () => {
    const response = await api.get("/admin/teachers");
    return response.data;
};

export const getTeacherById = async (id) => {
    const response = await api.get(`/admin/teachers/${id}`);
    return response.data;
};

export const createTeacher = async (teacher) => {
    const response = await api.post("/admin/teachers", teacher);
    return response.data;
};

export const updateTeacher = async (id, teacher) => {
    const response = await api.put(`/admin/teachers/${id}`, teacher);
    return response.data;
};

export const deleteTeacher = async (id) => {
    const response = await api.delete(`/admin/teachers/${id}`);
    return response.data;
};

export const enableTeacher = async (id) => {
    const response = await api.patch(`/admin/teachers/${id}/enable`);
    return response.data;
};

export const disableTeacher = async (id) => {
    const response = await api.patch(`/admin/teachers/${id}/disable`);
    return response.data;
};

/* ==========================================================
                        STUDENTS
========================================================== */

export const getStudents = async () => {
    const response = await api.get("/admin/students");
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await api.get(`/admin/students/${id}`);
    return response.data;
};

export const createStudent = async (student) => {
    const response = await api.post("/admin/students", student);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await api.put(`/admin/students/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await api.delete(`/admin/students/${id}`);
    return response.data;
};

export const enableStudent = async (id) => {
    const response = await api.patch(`/admin/students/${id}/enable`);
    return response.data;
};

export const disableStudent = async (id) => {
    const response = await api.patch(`/admin/students/${id}/disable`);
    return response.data;
};

/* ==========================================================
                        COURSES
========================================================== */

export const getCourses = async () => {
    const response = await api.get("/admin/courses");
    return response.data;
};

export const getCourseById = async (id) => {
    const response = await api.get(`/admin/courses/${id}`);
    return response.data;
};

export const createCourse = async (course) => {
    const response = await api.post("/admin/courses", course);
    return response.data;
};

export const updateCourse = async (id, course) => {
    const response = await api.put(`/admin/courses/${id}`, course);
    return response.data;
};

export const deleteCourse = async (id) => {
    const response = await api.delete(`/admin/courses/${id}`);
    return response.data;
};

export const enableCourse = async (id) => {
    const response = await api.patch(`/admin/courses/${id}/enable`);
    return response.data;
};

export const disableCourse = async (id) => {
    const response = await api.patch(`/admin/courses/${id}/disable`);
    return response.data;
};

/* ==========================================================
                        SUBJECTS
========================================================== */

export const getSubjects = async () => {
    const response = await api.get("/admin/subjects");
    return response.data;
};

export const getSubjectById = async (id) => {
    const response = await api.get(`/admin/subjects/${id}`);
    return response.data;
};

export const createSubject = async (subject) => {
    const response = await api.post("/admin/subjects", subject);
    return response.data;
};

export const updateSubject = async (id, subject) => {
    const response = await api.put(`/admin/subjects/${id}`, subject);
    return response.data;
};

export const deleteSubject = async (id) => {
    const response = await api.delete(`/admin/subjects/${id}`);
    return response.data;
};

export const enableSubject = async (id) => {
    const response = await api.patch(`/admin/subjects/${id}/enable`);
    return response.data;
};

export const disableSubject = async (id) => {
    const response = await api.patch(`/admin/subjects/${id}/disable`);
    return response.data;
};

/* ==========================================================
                        EXAMS
========================================================== */

export const getExams = async () => {
    const response = await api.get("/admin/exams");
    return response.data;
};

export const getExamById = async (id) => {
    const response = await api.get(`/admin/exams/${id}`);
    return response.data;
};

export const createExam = async (exam) => {
    const response = await api.post("/admin/exams", exam);
    return response.data;
};

export const updateExam = async (id, exam) => {
    const response = await api.put(`/admin/exams/${id}`, exam);
    return response.data;
};

export const deleteExam = async (id) => {
    const response = await api.delete(`/admin/exams/${id}`);
    return response.data;
};

export const enableExam = async (id) => {
    const response = await api.patch(`/admin/exams/${id}/enable`);
    return response.data;
};

export const disableExam = async (id) => {
    const response = await api.patch(`/admin/exams/${id}/disable`);
    return response.data;
};