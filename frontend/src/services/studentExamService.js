import api from "../api/axios";

const studentExamService = {

    getAvailableExams() {
        return api.get("/student/exams");
    },

    getExamQuestions(examId) {
        return api.get(`/student/exams/${examId}/questions`);
    },

    submitExam(data) {
        return api.post("/student/exams/submit", data);
    }

};

export default studentExamService;