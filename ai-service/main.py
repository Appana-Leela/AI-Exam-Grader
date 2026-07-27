from fastapi import FastAPI

from models import (
    EvaluationRequest,
    QuestionGenerationRequest,
    ModelAnswerRequest,
    IdealAnswerRequest
)

from prompts import (
    evaluation_prompt,
    question_generation_prompt,
    model_answer_prompt,
    ideal_answer_prompt
)

from ai_utils import (
    generate_text,
    generate_json,
    MODEL_NAME
)

app = FastAPI(
    title="AI Exam Evaluation Service",
    version="3.0"
)

# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():

    return {

        "status": "running",

        "ai_engine": "Ollama",

        "model": MODEL_NAME

    }


# =====================================================
# ANSWER EVALUATION
# =====================================================

@app.post("/evaluate")
async def evaluate(request: EvaluationRequest):

    prompt = evaluation_prompt(
        request.question,
        request.expectedAnswer,
        request.studentAnswer,
        request.maximumMarks
    )

    try:

        result = generate_json(prompt)

        return result

    except Exception as e:

        print("Evaluation Error:", e)

        return {
            "suggestedMarks": request.maximumMarks * 0.5,
            "confidence": 50,
            "feedback": f"AI evaluation failed: {str(e)}",
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }

# =====================================================
# QUESTION GENERATOR
# =====================================================

@app.post("/generate-questions")
async def generate_questions(request: QuestionGenerationRequest):

    prompt = question_generation_prompt(request)

    try:

        result = generate_json(prompt)

        return result

    except Exception as e:

        print(e)

        return {

            "questions": [

                {

                    "questionText": "Unable to generate question.",

                    "expectedAnswer": "",

                    "evaluationRubric": "",

                    "keywords": [],

                    "bloomLevel": "Understand",

                    "marks": request.marksPerQuestion,

                    "difficultyLevel": request.difficultyLevel,

                    "questionType": request.questionType

                }

            ]

        }
# =====================================================
# MODEL ANSWER GENERATOR
# =====================================================

@app.post("/generate-model-answer")
async def generate_model_answer(request: ModelAnswerRequest):

    prompt = model_answer_prompt(
        request.question,
        request.expectedAnswer
    )

    try:

        answer = generate_text(prompt)

        return {
            "success": True,
            "modelAnswer": answer
        }

    except Exception as e:

        print("Model Answer Error:", e)

        return {

            "success": False,

            "modelAnswer": "Unable to generate model answer."

        }


# =====================================================
# IDEAL ANSWER GENERATOR
# =====================================================

@app.post("/generate-ideal-answer")
async def generate_ideal_answer(request: IdealAnswerRequest):

    prompt = ideal_answer_prompt(
        request.question
    )

    try:

        answer = generate_text(prompt)

        return {

            "success": True,

            "idealAnswer": answer

        }

    except Exception as e:

        print("Ideal Answer Error:", e)

        return {

            "success": False,

            "idealAnswer": "Unable to generate ideal answer."

        }


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
def health():

    return {

        "status": "UP",

        "service": "AI Exam Evaluation Service",

        "aiEngine": "Ollama",

        "model": MODEL_NAME

    }