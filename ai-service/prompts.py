# ======================================================
# PROMPT TEMPLATES
# ======================================================

def evaluation_prompt(
    question,
    expected_answer,
    student_answer,
    maximum_marks
):

    return f"""
You are an experienced university professor and examiner.

Evaluate the student's answer fairly.

QUESTION:
{question}

EXPECTED ANSWER:
{expected_answer}

STUDENT ANSWER:
{student_answer}

MAXIMUM MARKS:
{maximum_marks}

Instructions:

1. Compare with the expected answer.
2. Award marks fairly.
3. Mention strengths.
4. Mention weaknesses.
5. Suggest improvements.
6. Give confidence score (0-100).

Return ONLY valid JSON.

{{
    "suggestedMarks": 0,
    "confidence": 0,
    "feedback": "",
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Do not return markdown.
Do not add explanations before or after JSON.
Return only the JSON object.
"""


# ======================================================
# QUESTION GENERATION
# ======================================================

def question_generation_prompt(request):

    return f"""
You are an experienced university professor.

Generate EXACTLY {request.numberOfQuestions} examination questions.

Subject:
{request.subject}

Topic:
{request.topic}

Difficulty:
{request.difficultyLevel}

Question Type:
{request.questionType}

Marks:
{request.marksPerQuestion}

For every question generate:

1. Question
2. Expected Answer
3. Evaluation Rubric
4. Five Important Keywords
5. Bloom Taxonomy Level

Return ONLY valid JSON.

{{
    "questions":[
        {{
            "questionText":"",
            "expectedAnswer":"",
            "evaluationRubric":"",
            "keywords":["","","","",""],
            "bloomLevel":"Understand",
            "marks":10,
            "difficultyLevel":"MEDIUM",
            "questionType":"DESCRIPTIVE"
        }}
    ]
}}

Do not return markdown.
"""


# ======================================================
# MODEL ANSWER
# ======================================================

def model_answer_prompt(question, expected_answer):

    return f"""
You are an experienced university professor.

Generate a university-level model answer.

Question:

{question}

Teacher Expected Answer:

{expected_answer}

Requirements:

- Clear
- Well structured
- Around 200 words
- Easy to understand
- Include important concepts
- Suitable for university examinations

Return ONLY the answer.
"""


# ======================================================
# IDEAL ANSWER
# ======================================================

def ideal_answer_prompt(question):

    return f"""
You are an experienced university professor.

Generate the ideal university examination answer.

Question:

{question}

Requirements:

- Complete answer
- Well structured
- Around 200-250 words
- Include important concepts
- Include examples whenever applicable
- Easy to understand

Return ONLY the answer.
"""