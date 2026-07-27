from pydantic import BaseModel

# ======================================================
# Answer Evaluation
# ======================================================

class EvaluationRequest(BaseModel):
    question: str
    expectedAnswer: str
    studentAnswer: str
    maximumMarks: float


# ======================================================
# Question Generation
# ======================================================

class QuestionGenerationRequest(BaseModel):
    subject: str
    topic: str
    difficultyLevel: str
    questionType: str
    numberOfQuestions: int
    marksPerQuestion: int


# ======================================================
# Model Answer Generation
# ======================================================

class ModelAnswerRequest(BaseModel):
    question: str
    expectedAnswer: str


# ======================================================
# Ideal Answer Generation
# ======================================================

class IdealAnswerRequest(BaseModel):
    question: str