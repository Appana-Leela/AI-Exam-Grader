package com.aiexam.dto.request;

public class IdealAnswerRequest {

    private String question;

    public IdealAnswerRequest() {
    }

    public IdealAnswerRequest(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

}