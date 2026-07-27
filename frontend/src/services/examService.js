import api from "../api/axios";

const examService = {

    getAllExams() {
        return api.get("/exams");
    },

    getExamById(id) {
        return api.get(`/exams/${id}`);
    },

    createExam(data) {
        return api.post("/exams", data);
    },

    updateExam(id, data) {
        return api.put(`/exams/${id}`, data);
    },

    deleteExam(id) {
        return api.delete(`/exams/${id}`);
    },

    publishExam(id) {
        return api.patch(`/exams/${id}/publish`);
    }

};

export default examService;