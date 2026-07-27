import { FileQuestion, Award } from "lucide-react";

export default function QuestionCard({

    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    onSelect

}) {

    if (!question) {

        return (

            <div className="bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-xl font-semibold">

                    Loading Question...

                </h2>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-8">

            {/* Header */}

            <div className="flex justify-between items-center border-b pb-5">

                <div>

                    <h2 className="text-2xl font-bold flex items-center gap-2">

                        <FileQuestion className="text-blue-600" />

                        Question {questionNumber} / {totalQuestions}

                    </h2>

                </div>

                <div className="flex gap-3">

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            question.questionType === "MCQ"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                        }`}
                    >
                        {question.questionType}
                    </span>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            question.difficultyLevel === "EASY"
                                ? "bg-green-100 text-green-700"
                                : question.difficultyLevel === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {question.difficultyLevel}
                    </span>

                    <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">

                        <Award size={16} />

                        {question.marks} Marks

                    </span>

                </div>

            </div>

            {/* Question */}

            <div className="mt-8">

                <h3 className="text-xl leading-8 font-medium">

                    {question.questionText}

                </h3>

            </div>

            {/* MCQ */}

            {question.questionType === "MCQ" ? (

                <div className="mt-8 space-y-4">

                    {question.options.map((option) => (

                        <label

                            key={option.optionId}

                            className={`

                                flex
                                items-center
                                gap-4
                                border-2
                                rounded-xl
                                p-4
                                cursor-pointer
                                transition-all

                                ${
                                    selectedAnswer === option.optionId
                                        ? "border-blue-600 bg-blue-50"
                                        : "hover:border-blue-300"
                                }

                            `}
                        >

                            <input

                                type="radio"

                                name="answer"

                                checked={selectedAnswer === option.optionId}

                                onChange={() => onSelect(option.optionId)}

                            />

                            <span className="font-semibold">

                                {option.optionId}.

                            </span>

                            <span>

                                {option.optionText}

                            </span>

                        </label>

                    ))}

                </div>

            ) : (

                <div className="mt-8">

                    <textarea

                        rows={10}

                        value={selectedAnswer}

                        onChange={(e) => onSelect(e.target.value)}

                        placeholder="Write your answer here..."

                        className="w-full border-2 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

            )}

        </div>

    );

}