import api from "../api/axios";

const pdfService = {

    downloadResultPdf(attemptId) {

        return api.get(

            `/reports/result/${attemptId}`,

            {

                responseType: "blob"

            }

        );

    },

    downloadQuestionPaper(examId) {

        return api.get(

            `/reports/question-paper/${examId}`,

            {

                responseType: "blob"

            }

        );

    }

};

export default pdfService;