import api from "../api/axios";

const aiIdealAnswerService = {

    generate(question) {

        return api.post(

            "/ai/ideal-answer",

            null,

            {

                params: {

                    question

                }

            }

        );

    }

};

export default aiIdealAnswerService;