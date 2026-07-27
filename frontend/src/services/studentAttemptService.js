import api from "../api/axios";

const studentAttemptService = {

    startExam(examId) {
        return api.post("/attempts/start", {
            examId
        });
    },

    saveAnswer(attemptId, data) {
        return api.put(`/attempts/${attemptId}/answer`, data);
    },

    submitExam(attemptId) {
        return api.put(`/attempts/${attemptId}/submit`);
    },

    getAttempt(attemptId) {
        return api.get(`/attempts/${attemptId}`);
    },

    getMyAttempts() {
        return api.get("/student/attempts");
    }

};

export default studentAttemptService;