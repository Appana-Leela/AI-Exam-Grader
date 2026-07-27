import { CheckCircle2, Circle, BookOpen } from "lucide-react";

export default function QuestionPalette({

    questions,
    currentQuestion,
    answers,
    onQuestionSelect

}) {

    const answeredCount = answers.length;

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-5">

                <BookOpen className="text-blue-600" />

                <h2 className="text-xl font-bold">

                    Question Palette

                </h2>

            </div>

            <div className="grid grid-cols-5 gap-3">

                {questions.map((question, index) => {

                    const answered = answers.some(
                        answer => answer.questionId === question.id
                    );

                    return (

                        <button

                            key={question.id}

                            onClick={() => onQuestionSelect(index)}

                            className={`
                                h-12
                                w-12
                                rounded-lg
                                font-semibold
                                transition-all
                                duration-200

                                ${
                                    currentQuestion === index
                                        ? "bg-blue-600 text-white shadow-lg scale-105"
                                        : answered
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }
                            `}

                        >

                            {index + 1}

                        </button>

                    );

                })}

            </div>

            <div className="mt-8 border-t pt-5 space-y-4">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-green-600"
                        />

                        <span>

                            Answered

                        </span>

                    </div>

                    <span className="font-bold">

                        {answeredCount}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <Circle
                            size={18}
                            className="text-gray-500"
                        />

                        <span>

                            Remaining

                        </span>

                    </div>

                    <span className="font-bold">

                        {questions.length - answeredCount}

                    </span>

                </div>

                <div className="mt-5">

                    <div className="flex items-center gap-3 text-sm">

                        <div className="w-4 h-4 rounded bg-blue-600"></div>

                        <span>Current Question</span>

                    </div>

                    <div className="flex items-center gap-3 text-sm mt-2">

                        <div className="w-4 h-4 rounded bg-green-500"></div>

                        <span>Answered</span>

                    </div>

                    <div className="flex items-center gap-3 text-sm mt-2">

                        <div className="w-4 h-4 rounded bg-gray-300"></div>

                        <span>Not Answered</span>

                    </div>

                </div>

            </div>

        </div>

    );

}