export default function EvaluationCard({

    answer,

    onMarksChange,

    onRemarksChange,

    onGenerateAI,

    onGenerateIdealAnswer

}) {

    const isDescriptive =
        answer.questionType === "DESCRIPTIVE";

    return (

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6">

            {/* Question */}

            <div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-white">

                    Question

                </h2>

                <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 whitespace-pre-wrap">

                    {answer.questionText}

                </div>

            </div>

            {/* Expected Answer */}

            {

                isDescriptive && answer.expectedAnswer && (

                    <div>

                        <h3 className="font-semibold text-green-700">

                            Expected Answer

                        </h3>

                        <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4 whitespace-pre-wrap">

                            {answer.expectedAnswer}

                        </div>

                    </div>

                )

            }

            {/* MCQ */}

            {

                answer.questionType === "MCQ" && (

                    <div className="space-y-3">

                        <div>

                            <span className="font-semibold">

                                Selected Option :

                            </span>

                            <span className="ml-2">

                                {answer.selectedOptionId}

                            </span>

                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">

                            <h3 className="font-semibold text-green-700">

                                ✓ Auto Evaluation

                            </h3>

                            <p className="mt-2 text-gray-700">

                                This is an MCQ question.

                                Marks are evaluated automatically using the
                                correct option.

                                AI evaluation is available only for
                                descriptive questions.

                            </p>

                        </div>

                    </div>

                )

            }

            {/* Student Answer */}

            <div>

                <div className="flex flex-wrap gap-3 justify-between items-center">

                    <h3 className="font-semibold">

                        Student Answer

                    </h3>

                    {

                        isDescriptive && (

                            <div className="flex gap-3">

                                <button

                                    onClick={onGenerateAI}

                                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg"

                                >

                                    Generate AI Feedback

                                </button>

                                <button

                                    onClick={onGenerateIdealAnswer}

                                    className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-lg"

                                >

                                    Generate Ideal Answer

                                </button>

                            </div>

                        )

                    }

                </div>

                <div className="mt-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 whitespace-pre-wrap">

                    {

                        answer.descriptiveAnswer ||

                        "No descriptive answer submitted."

                    }

                </div>

            </div>

            {/* AI Feedback */}

            {

                answer.aiFeedback && (

                    <div className="rounded-xl border border-blue-300 bg-blue-50 p-5">

                        <h3 className="text-blue-700 font-bold mb-4">

                            🤖 AI Evaluation Report

                        </h3>

                        <textarea

                            value={answer.aiFeedback}

                            readOnly

                            rows={12}

                            className="w-full bg-white rounded-lg border p-4 text-sm whitespace-pre-wrap resize-none"

                        />

                    </div>

                )

            }

            {/* AI Ideal Answer */}

            {

                answer.idealAnswer && (

                    <div className="rounded-xl border border-purple-300 bg-purple-50 p-5">

                        <h3 className="text-purple-700 font-bold mb-4">

                            ⭐ AI Generated Ideal Answer

                        </h3>

                        <textarea

                            value={answer.idealAnswer}

                            readOnly

                            rows={12}

                            className="w-full bg-white rounded-lg border p-4 text-sm whitespace-pre-wrap resize-none"

                        />

                    </div>

                )

            }

            {/* Marks & Remarks */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                    <label className="font-semibold">

                        Marks Awarded

                    </label>

                    <input

                        type="number"

                        value={answer.marksAwarded}

                        min={0}

                        max={answer.marks}

                        step="0.5"

                        onChange={(e)=>

                            onMarksChange(e.target.value)

                        }

                        className="w-full mt-2 border rounded-lg p-3"

                    />

                    <p className="text-sm text-gray-500 mt-2">

                        Maximum Marks :

                        <span className="font-semibold ml-2">

                            {answer.marks}

                        </span>

                    </p>

                </div>

                <div>

                    <label className="font-semibold">

                        Teacher Remarks

                    </label>

                    <textarea

                        rows={6}

                        value={answer.teacherRemarks}

                        onChange={(e)=>

                            onRemarksChange(e.target.value)

                        }

                        placeholder="Write your remarks..."

                        className="w-full mt-2 border rounded-lg p-3"

                    />

                </div>

            </div>

        </div>

    );

}