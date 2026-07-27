import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import teacherAttemptService from "../../services/teacherAttemptService";
import questionService from "../../services/questionService";
import aiService from "../../services/aiService";

import EvaluationCard from "../../components/teacher/EvaluationCard";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import aiIdealAnswerService from "../../services/aiIdealAnswerService";
import { toast } from "sonner";

export default function TeacherEvaluation() {

    const { attemptId } = useParams();

    const [loading, setLoading] = useState(true);

    const [attempt, setAttempt] = useState(null);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const attemptResponse =
                await teacherAttemptService.getAttempt(
                    attemptId
                );

            const attemptData =
                attemptResponse.data.data;

            setAttempt(attemptData);

            const questionResponse =
                await questionService.getQuestionsByExam(
                    attemptData.examId
                );

            const mergedQuestions =
                questionResponse.data.data.map(question => {

                    const answer =
                        attemptData.answers.find(
                            a =>
                                a.questionId === question.id
                        );

                    return {

                        ...question,

                        descriptiveAnswer:
                            answer?.descriptiveAnswer || "",

                        selectedOptionId:
                            answer?.selectedOptionId || "",

                        marksAwarded:
                            answer?.marksAwarded || 0,

                        teacherRemarks:
                            answer?.teacherRemarks || "",

                        aiFeedback:
                            answer?.aiFeedback || "",

                        aiStrengths:
                            answer?.aiStrengths || [],

                        aiWeaknesses:
                            answer?.aiWeaknesses || [],

                        aiSuggestions:
                            answer?.aiSuggestions || [],

                        idealAnswer:
                            ""

                    };

                });

            setQuestions(mergedQuestions);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load evaluation."
            );

        }

        finally {

            setLoading(false);

        }

    }

    function updateMarks(index, value) {

        const updated = [...questions];

        updated[index].marksAwarded =
            Number(value);

        setQuestions(updated);

    }

    function updateRemarks(index, value) {

        const updated = [...questions];

        updated[index].teacherRemarks =
            value;

        setQuestions(updated);

    }

    async function generateAI(index) {

        try {

            const question =
                questions[index];
            
            console.log("Evaluation Question");
            console.log(JSON.stringify(question, null, 2));
            const response =
                await aiService.evaluate({
                    question: question.questionText,
                    expectedAnswer: question.correctAnswer || question.modelAnswer || question.idealAnswer || "",
                    studentAnswer: question.descriptiveAnswer || "",
                    maximumMarks: question.marks
                });

            const updated =
                [...questions];

            const ai = response.data.data;

            updated[index].marksAwarded =
                ai.suggestedMarks;

            updated[index].aiFeedback =
                ai.feedback;

            updated[index].aiStrengths =
                ai.strengths || [];

            updated[index].aiWeaknesses =
                ai.weaknesses || [];

            updated[index].aiSuggestions =
                ai.suggestions || [];

            setQuestions(updated);

            toast.success(
                "AI Evaluation Generated"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to generate AI feedback."
            );

        }

    }

    async function generateIdealAnswer(index) {

        try {

            const question = questions[index];

            const response =
                await aiIdealAnswerService.generate(
                    question.questionText
                );

            const updated = [...questions];

            updated[index].idealAnswer =
                response.data.data;

            setQuestions(updated);

            toast.success(
                "Ideal Answer Generated"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to generate ideal answer."
            );

        }

    }

    async function saveEvaluation() {

        try {

            const payload = {

                evaluations:

                    questions.map(question => ({

                        questionId:
                            question.id,

                        marksAwarded:
                            question.marksAwarded,

                        remarks:
                            question.teacherRemarks

                    }))

            };

            await teacherAttemptService.evaluateAttempt(

                attemptId,

                payload

            );

            toast.success(
                "Evaluation Saved Successfully"
            );

            await loadData();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to save evaluation."
            );

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    <div className="text-center">

                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>

                        <p className="mt-5">

                            Loading Evaluation...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }
        return (

        <DashboardLayout>

            <div className="space-y-6">

                <BackButton />

                <Breadcrumb
                    items={[
                        "Dashboard",
                        "Exams",
                        "Attempts",
                        "Evaluation"
                    ]}
                />

                <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-3xl font-bold">

                                Teacher Evaluation

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Evaluate student responses using AI assistance.

                            </p>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div>

                            <p className="text-sm text-gray-500">

                                Examination

                            </p>

                            <p className="font-semibold text-lg">

                                {attempt.examTitle}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">

                                Student

                            </p>

                            <p className="font-semibold text-lg">

                                {attempt.studentEmail}

                            </p>

                        </div>

                    </div>

                </div>

                {

                    questions.map((question, index) => (

                        <div
                            key={question.id}
                            className="space-y-4"
                        >

                            <EvaluationCard

                                answer={question}

                                onMarksChange={(value) =>
                                    updateMarks(index, value)
                                }

                                onRemarksChange={(value) =>
                                    updateRemarks(index, value)
                                }

                                onGenerateAI={() =>
                                    generateAI(index)
                                }

                                onGenerateIdealAnswer={() =>
                                    generateIdealAnswer(index)
                                }

                            />

                            {
                                question.aiFeedback && (

                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-5">

                                        <h3 className="font-semibold text-blue-700 text-lg">

                                            🤖 AI Evaluation Feedback

                                        </h3>

                                        <div>

                                            <h4 className="font-semibold mb-2">
                                                Feedback
                                            </h4>

                                            <p className="whitespace-pre-wrap text-gray-700">

                                                {question.aiFeedback}

                                            </p>

                                        </div>

                                        {

                                            question.aiStrengths?.length > 0 && (

                                                <div>

                                                    <h4 className="font-semibold text-green-700 mb-2">

                                                        ✅ Strengths

                                                    </h4>

                                                    <ul className="list-disc ml-6 space-y-1">

                                                        {

                                                            question.aiStrengths.map((item, i) => (

                                                                <li key={i}>

                                                                    {item}

                                                                </li>

                                                            ))

                                                        }

                                                    </ul>

                                                </div>

                                            )

                                        }

                                        {

                                            question.aiWeaknesses?.length > 0 && (

                                                <div>

                                                    <h4 className="font-semibold text-red-700 mb-2">

                                                        ❌ Weaknesses

                                                    </h4>

                                                    <ul className="list-disc ml-6 space-y-1">

                                                        {

                                                            question.aiWeaknesses.map((item, i) => (

                                                                <li key={i}>

                                                                    {item}

                                                                </li>

                                                            ))

                                                        }

                                                    </ul>

                                                </div>

                                            )

                                        }

                                        {

                                            question.aiSuggestions?.length > 0 && (

                                                <div>

                                                    <h4 className="font-semibold text-purple-700 mb-2">

                                                        💡 Suggestions

                                                    </h4>

                                                    <ul className="list-disc ml-6 space-y-1">

                                                        {

                                                            question.aiSuggestions.map((item, i) => (

                                                                <li key={i}>

                                                                    {item}

                                                                </li>

                                                            ))

                                                        }

                                                    </ul>

                                                </div>

                                            )

                                        }

                                    </div>

                                )

                            }

                        {

                            question.idealAnswer && (

                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">

                                    <h3 className="font-semibold text-purple-700">

                                        ⭐ AI Generated Ideal Answer

                                    </h3>

                                    <p className="mt-3 whitespace-pre-wrap text-gray-700">

                                        {question.idealAnswer}

                                    </p>

                                </div>

                            )

                        }

                        </div>

                    ))

                }

                <div className="sticky bottom-0 bg-white border rounded-xl shadow-lg p-5 flex justify-end">

                    <button

                        onClick={saveEvaluation}

                        className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-xl font-semibold"

                    >

                        Save Evaluation

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}