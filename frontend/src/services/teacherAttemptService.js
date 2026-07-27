import api from "../api/axios";

const teacherAttemptService = {

    getAttempts(examId) {
        return api.get(`/teacher/exams/${examId}/attempts`);
    },

    getAttempt(attemptId) {
        return api.get(`/attempts/${attemptId}`);
    },

    evaluateAttempt(attemptId, data) {
        return api.post(
            `/teacher/attempts/${attemptId}/evaluate`,
            data
        );
    }

};

export default teacherAttemptService;