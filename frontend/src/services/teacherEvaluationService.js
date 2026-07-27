import api from "../api/axios";

const teacherEvaluationService = {

    evaluateAttempt(attemptId, data) {

        return api.post(
            `/teacher/attempts/${attemptId}/evaluate`,
            data
        );

    }

};

export default teacherEvaluationService;