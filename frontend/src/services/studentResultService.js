import api from "../api/axios";

const studentResultService = {

    getResult(attemptId) {
        return api.get(`/attempts/${attemptId}`);
    }

};

export default studentResultService;