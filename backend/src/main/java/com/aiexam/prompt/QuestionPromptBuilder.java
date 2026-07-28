package com.aiexam.prompt;

import com.aiexam.dto.AIQuestionGenerateRequest;

public class QuestionPromptBuilder {

    private QuestionPromptBuilder() {
    }

    public static String buildPrompt(AIQuestionGenerateRequest request) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are an expert university professor.

Generate ONLY valid JSON.

Do NOT return markdown.

Do NOT explain anything.

Return JSON only.

Schema:

{
  "topic":"",
  "totalGenerated":0,
  "questions":[
    {
      "question":"",
      "options":["","","",""],
      "answer":"",
      "explanation":"",
      "keywords":[]
    }
  ]
}
""");

        prompt.append("\n");

        prompt.append("Course : ")
                .append(request.getCourseId())
                .append("\n");

        prompt.append("Subject : ")
                .append(request.getSubjectId())
                .append("\n");

        prompt.append("Topic : ")
                .append(request.getTopic())
                .append("\n");

        prompt.append("Question Type : ")
                .append(request.getQuestionType())
                .append("\n");

        prompt.append("Difficulty : ")
                .append(request.getDifficulty())
                .append("\n");

        prompt.append("Bloom Level : ")
                .append(request.getBloomLevel())
                .append("\n");

        prompt.append("Questions : ")
                .append(request.getNumberOfQuestions())
                .append("\n");

        prompt.append("Marks : ")
                .append(request.getMarksPerQuestion());

        return prompt.toString();
    }
}