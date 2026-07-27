import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";

import aiQuestionService from "../../services/aiQuestionService";
import aiQuestionSaveService from "../../services/aiQuestionSaveService";
import examService from "../../services/examService";

import GeneratedQuestionCard from "../../components/questions/GeneratedQuestionCard";

export default function AIQuestionGenerator() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [questions, setQuestions] = useState([]);

    const [exams, setExams] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");

    const [form, setForm] = useState({

        subject: "",

        topic: "",

        difficultyLevel: "MEDIUM",

        questionType: "DESCRIPTIVE",

        numberOfQuestions: 5,

        marksPerQuestion: 10

    });

    useEffect(() => {

        loadExams();

    }, []);

    async function loadExams() {

        try {

            const response =
                await examService.getAllExams();

            setExams(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load examinations."
            );

        }

    }

    function updateField(field, value) {

        setForm(previous => ({

            ...previous,

            [field]: value

        }));

    }

    async function generate() {

        try {

            setLoading(true);

            const response =
                await aiQuestionService.generateQuestions(form);

            setQuestions(response.data.data.questions);

            toast.success(
                "Questions Generated Successfully"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to generate questions."
            );

        }

        finally {

            setLoading(false);

        }

    }

    async function saveQuestions() {

        if (!selectedExam) {

            toast.error(
                "Please select an examination."
            );

            return;

        }

        if (questions.length === 0) {

            toast.error(
                "Generate questions first."
            );

            return;

        }

        try {

            setSaving(true);

            await aiQuestionSaveService.saveQuestions({

                examId: selectedExam,

                questions

            });

            toast.success(
                "Questions Saved Successfully."
            );

            navigate(
                `/teacher/questions/${selectedExam}`
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to save questions."
            );

        }

        finally {

            setSaving(false);

        }

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold">

                        AI Question Generator

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Generate university-level examination questions
                        using Gemini AI.

                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <input

                            className="border rounded-xl p-3"

                            placeholder="Subject"

                            value={form.subject}

                            onChange={(e)=>

                                updateField(

                                    "subject",

                                    e.target.value

                                )

                            }

                        />

                        <input

                            className="border rounded-xl p-3"

                            placeholder="Topic"

                            value={form.topic}

                            onChange={(e)=>

                                updateField(

                                    "topic",

                                    e.target.value

                                )

                            }

                        />

                        <select

                            className="border rounded-xl p-3"

                            value={form.difficultyLevel}

                            onChange={(e)=>

                                updateField(

                                    "difficultyLevel",

                                    e.target.value

                                )

                            }

                        >

                            <option value="EASY">

                                EASY

                            </option>

                            <option value="MEDIUM">

                                MEDIUM

                            </option>

                            <option value="HARD">

                                HARD

                            </option>

                        </select>

                        <select

                            className="border rounded-xl p-3"

                            value={form.questionType}

                            onChange={(e)=>

                                updateField(

                                    "questionType",

                                    e.target.value

                                )

                            }

                        >

                            <option value="DESCRIPTIVE">

                                DESCRIPTIVE

                            </option>

                            <option value="MCQ">

                                MCQ

                            </option>

                        </select>

                        <input

                            type="number"

                            className="border rounded-xl p-3"

                            value={form.numberOfQuestions}

                            onChange={(e)=>

                                updateField(

                                    "numberOfQuestions",

                                    Number(e.target.value)

                                )

                            }

                        />

                        <input

                            type="number"

                            className="border rounded-xl p-3"

                            value={form.marksPerQuestion}

                            onChange={(e)=>

                                updateField(

                                    "marksPerQuestion",

                                    Number(e.target.value)

                                )

                            }

                        />
                                            </div>

                    <div className="mt-8">

                        <label className="block text-sm font-semibold mb-2">

                            Select Examination

                        </label>

                        <select

                            value={selectedExam}

                            onChange={(e)=>
                                setSelectedExam(e.target.value)
                            }

                            className="w-full border rounded-xl p-3"

                        >

                            <option value="">

                                Select Examination

                            </option>

                            {

                                exams.map((exam) => (

                                    <option

                                        key={exam.id}

                                        value={exam.id}

                                    >

                                        {exam.title}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="flex gap-4 mt-8">

                        <button

                            onClick={generate}

                            disabled={loading}

                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"

                        >

                            {

                                loading

                                    ? "Generating..."

                                    : "Generate Questions"

                            }

                        </button>

                        {

                            questions.length > 0 && (

                                <button

                                    onClick={saveQuestions}

                                    disabled={saving}

                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"

                                >

                                    {

                                        saving

                                            ? "Saving..."

                                            : "Save To Exam"

                                    }

                                </button>

                            )

                        }

                    </div>

                </div>

                {

                    questions.length > 0 && (

                        <div>

                            <h2 className="text-2xl font-bold mb-6">

                                Generated Questions

                            </h2>

                            <div className="space-y-6">

                                {

                                    questions.map(

                                        (

                                            question,

                                            index

                                        ) => (

                                            <GeneratedQuestionCard

                                                key={index}

                                                question={question}

                                                index={index}

                                            />

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                }

            </div>

        </DashboardLayout>

    );

}