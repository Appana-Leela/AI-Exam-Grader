import api from "../api/axios";

const aiQuestionSaveService = {

    saveQuestions(data) {

        return api.post(

            "/questions/generated",

            data

        );

    }

};

export default aiQuestionSaveService;