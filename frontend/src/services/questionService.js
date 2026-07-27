import api from "../api/axios";

const questionService = {

    getQuestionsByExam(examId) {
        return api.get(`/questions/exam/${examId}`);
    },

    getQuestionById(id) {
        return api.get(`/questions/${id}`);
    },

    createQuestion(data) {
        return api.post("/questions", data);
    },

    updateQuestion(id, data) {
        return api.put(`/questions/${id}`, data);
    },

    deleteQuestion(id) {
        return api.delete(`/questions/${id}`);
    }

};

export default questionService;