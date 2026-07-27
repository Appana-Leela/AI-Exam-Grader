import api from "../api/axios";

const aiService = {

    evaluate(data) {

        return api.post(
            "/ai/evaluate",
            data
        );

    }

};

export default aiService;