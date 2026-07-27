package com.aiexam.dto.response;

public class IdealAnswerResponse {

    private boolean success;

    private String idealAnswer;

    public IdealAnswerResponse() {
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getIdealAnswer() {
        return idealAnswer;
    }

    public void setIdealAnswer(String idealAnswer) {
        this.idealAnswer = idealAnswer;
    }

}