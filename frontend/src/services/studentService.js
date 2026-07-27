import api from "../api/axios";

const studentService = {

    getAvailableExams() {
        return api.get("/student/exams");
    },

    getAttempts() {
        return api.get("/student/attempts");
    },

    getDashboard() {
        return api.get("/student/dashboard");
    },

    getResult(attemptId) {
        return api.get(`/student/results/${attemptId}`);
    }

};

export default studentService;