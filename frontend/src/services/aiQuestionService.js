import api from "./api";

const aiQuestionService = {

    generateQuestions(data) {

        return api.post(

            "/teacher/ai/generate-questions",

            data

        );

    }

};

export default aiQuestionService;