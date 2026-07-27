import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";

import studentAttemptService from "../../services/studentAttemptService";
import questionService from "../../services/questionService";

import ExamHeader from "../../components/student/ExamHeader";
import ExamTimer from "../../components/student/ExamTimer";
import QuestionCard from "../../components/student/QuestionCard";
import QuestionPalette from "../../components/student/QuestionPalette";
import BottomNavigation from "../../components/student/BottomNavigation";

import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function StudentExamPage() {

    const { attemptId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [attempt, setAttempt] = useState(null);

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadExam();

    }, []);

    async function loadExam() {

        try {

            const attemptResponse =
                await studentAttemptService.getAttempt(
                    attemptId
                );

            const attemptData =
                attemptResponse.data.data;

            setAttempt(attemptData);

            const questionResponse =
                await questionService.getQuestionsByExam(
                    attemptData.examId
                );

            setQuestions(
                questionResponse.data.data
            );

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to load examination."

            );

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        if (!attempt) return;

        if (questions.length === 0) return;

        const current =
            questions[currentQuestion];

        const existingAnswer =
            attempt.answers.find(

                answer =>

                    answer.questionId === current.id

            );

        if (!existingAnswer) {

            setSelectedAnswer("");

            return;

        }

        if (current.questionType === "MCQ") {

            setSelectedAnswer(

                existingAnswer.selectedOptionId || ""

            );

        }

        else {

            setSelectedAnswer(

                existingAnswer.descriptiveAnswer || ""

            );

        }

    }, [

        attempt,

        currentQuestion,

        questions

    ]);

    const saveCurrentAnswer =
        useCallback(async () => {

            if (!attempt) return;

            if (questions.length === 0) return;

            const question =
                questions[currentQuestion];

            try {

                setSaving(true);

                await studentAttemptService.saveAnswer(

                    attempt.id,

                    {

                        questionId:
                            question.id,

                        selectedOptionId:

                            question.questionType === "MCQ"

                                ? selectedAnswer

                                : null,

                        descriptiveAnswer:

                            question.questionType === "DESCRIPTIVE"

                                ? selectedAnswer

                                : null

                    }

                );

                const updated =
                    await studentAttemptService.getAttempt(
                        attempt.id
                    );

                setAttempt(updated.data.data);

            }

            catch (error) {

                console.error(error);

                toast.error(
                    "Unable to save answer."
                );

            }

            finally {

                setSaving(false);

            }

        }, [

            attempt,

            questions,

            currentQuestion,

            selectedAnswer

        ]);

    async function handlePrevious() {

        await saveCurrentAnswer();

        setCurrentQuestion(prev => prev - 1);

    }

    async function handleNext() {

        await saveCurrentAnswer();

        setCurrentQuestion(prev => prev + 1);

    }

    async function handleSubmit() {

        await saveCurrentAnswer();

        try {

            await studentAttemptService.submitExam(
                attempt.id
            );

            toast.success(
                "Exam submitted successfully."
            );

            navigate("/student/exams");

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to submit exam."
            );

        }

    }

    async function handleTimeUp() {

        toast.error(
            "Time is over. Submitting exam..."
        );

        await handleSubmit();

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    <div className="text-center">

                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>

                        <p className="mt-5 text-lg">

                            Loading Examination...

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
                        "My Exams",
                        "Attempt Examination"
                    ]}
                />

                <ExamHeader

                    examTitle={
                        attempt?.examTitle ||
                        "Online Examination"
                    }

                    subject={
                        attempt?.subject ||
                        "Subject"
                    }

                    totalQuestions={
                        questions.length
                    }

                    answeredQuestions={
                        attempt?.answers?.length || 0
                    }

                    timer={
                        <ExamTimer
                            durationInMinutes={60}
                            onTimeUp={handleTimeUp}
                        />
                    }

                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Question Section */}

                    <div className="lg:col-span-3 space-y-6">

                        <QuestionCard

                            question={
                                questions[currentQuestion]
                            }

                            questionNumber={
                                currentQuestion + 1
                            }

                            totalQuestions={
                                questions.length
                            }

                            selectedAnswer={
                                selectedAnswer
                            }

                            onSelect={(value) =>

                                setSelectedAnswer(value)

                            }

                        />

                        {/* Reserved for future AI Hint / OCR Upload */}
                        <div className="bg-slate-50 border rounded-xl p-4">

                            <h3 className="font-semibold mb-2">

                                AI Assistant

                            </h3>

                            <p className="text-sm text-gray-500">

                                AI hints, OCR upload and handwriting
                                support will appear here in the next
                                implementation.

                            </p>

                        </div>

                    </div>

                    {/* Question Palette */}

                    <div>

                        <QuestionPalette

                            questions={
                                questions
                            }

                            currentQuestion={
                                currentQuestion
                            }

                            answers={
                                attempt?.answers || []
                            }

                            onQuestionSelect={
                                setCurrentQuestion
                            }

                        />

                    </div>

                </div>

                {/* Sticky Bottom Navigation */}

                <div className="sticky bottom-0 bg-white rounded-xl shadow-lg border p-4">

                    <BottomNavigation

                        currentQuestion={
                            currentQuestion
                        }

                        totalQuestions={
                            questions.length
                        }

                        onPrevious={
                            handlePrevious
                        }

                        onNext={
                            handleNext
                        }

                        onSave={
                            saveCurrentAnswer
                        }

                        onSubmit={
                            handleSubmit
                        }

                        saving={
                            saving
                        }

                    />

                    {

                        saving &&

                        <div className="text-green-600 text-sm mt-3 font-medium">

                            Saving answer...

                        </div>

                    }

                </div>

            </div>

        </DashboardLayout>

    );

}