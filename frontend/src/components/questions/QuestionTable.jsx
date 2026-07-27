import { Pencil, Trash2 } from "lucide-react";

export default function QuestionTable({
    questions,
    onEdit,
    onDelete
}) {

    if (questions.length === 0) {

        return (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                No questions found.
            </div>
        );

    }

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">Question</th>
                        <th className="text-center p-4">Type</th>
                        <th className="text-center p-4">Difficulty</th>
                        <th className="text-center p-4">Marks</th>
                        <th className="text-center p-4">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {questions.map((question) => (

                        <tr
                            key={question.id}
                            className="border-t hover:bg-slate-50 transition"
                        >

                            {/* Question */}

                            <td className="p-4 w-[50%]">

                                <div className="space-y-3">

                                    <h3 className="font-semibold text-gray-900">
                                        {question.questionText}
                                    </h3>

                                    {question.questionType === "MCQ" ? (

                                        <div className="space-y-1">

                                            {question.options
                                                ?.filter(option => option.optionText.trim() !== "")
                                                .map((option) => (

                                                    <div
                                                        key={option.optionId}
                                                        className={`rounded-lg px-3 py-2 text-sm ${
                                                            option.correct
                                                                ? "bg-green-100 text-green-700 font-semibold border border-green-300"
                                                                : "bg-gray-50 text-gray-700"
                                                        }`}
                                                    >

                                                        <span className="font-medium">
                                                            {option.optionId}.
                                                        </span>{" "}

                                                        {option.optionText}

                                                        {option.correct && " ✔"}

                                                    </div>

                                                ))}

                                        </div>

                                    ) : (

                                        <div className="bg-gray-100 rounded-lg p-3 text-sm">

                                            <p className="font-semibold mb-1">
                                                Expected Answer
                                            </p>

                                            <p>
                                                {question.expectedAnswer || "-"}
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </td>

                            {/* Question Type */}

                            <td className="text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        question.questionType === "MCQ"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-purple-100 text-purple-700"
                                    }`}
                                >

                                    {question.questionType}

                                </span>

                            </td>

                            {/* Difficulty */}

                            <td className="text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        question.difficultyLevel === "EASY"
                                            ? "bg-green-100 text-green-700"
                                            : question.difficultyLevel === "MEDIUM"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >

                                    {question.difficultyLevel}

                                </span>

                            </td>

                            {/* Marks */}

                            <td className="text-center font-semibold">

                                ⭐ {question.marks}

                            </td>

                            {/* Actions */}

                            <td>

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onEdit(question)}
                                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                                        title="Edit"
                                    >

                                        <Pencil
                                            className="text-blue-600"
                                            size={18}
                                        />

                                    </button>

                                    <button
                                        onClick={() => onDelete(question.id)}
                                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                                        title="Delete"
                                    >

                                        <Trash2
                                            className="text-red-600"
                                            size={18}
                                        />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}