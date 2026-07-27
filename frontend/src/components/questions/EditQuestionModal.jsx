import { useEffect, useState } from "react";
import { toast } from "sonner";
import questionService from "../../services/questionService";

export default function EditQuestionModal({
    open,
    question,
    onClose,
    onSuccess
}) {

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (question) {

            setForm({
                questionText: question.questionText,
                questionType: question.questionType,
                difficultyLevel: question.difficultyLevel,
                marks: question.marks,
                expectedAnswer: question.expectedAnswer || "",
                explanation: question.explanation || "",
                options: question.options || []
            });

        }

    }, [question]);

    if (!open || !question || !form) return null;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleOptionChange = (index, value) => {

        const updated = [...form.options];

        updated[index].optionText = value;

        setForm({
            ...form,
            options: updated
        });

    };

    const handleCorrectOption = (index) => {

        const updated = form.options.map((option, i) => ({
            ...option,
            correct: i === index
        }));

        setForm({
            ...form,
            options: updated
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await questionService.updateQuestion(
                question.id,
                form
            );

            toast.success("Question updated successfully!");

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update question."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Question
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <textarea
                        name="questionText"
                        value={form.questionText}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border rounded-lg p-3"
                    />

                    <div className="grid grid-cols-3 gap-4">

                        <select
                            name="questionType"
                            value={form.questionType}
                            onChange={handleChange}
                            className="border rounded-lg p-3"
                        >
                            <option value="MCQ">MCQ</option>
                            <option value="DESCRIPTIVE">DESCRIPTIVE</option>
                        </select>

                        <select
                            name="difficultyLevel"
                            value={form.difficultyLevel}
                            onChange={handleChange}
                            className="border rounded-lg p-3"
                        >
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>

                        <input
                            type="number"
                            name="marks"
                            value={form.marks}
                            onChange={handleChange}
                            className="border rounded-lg p-3"
                        />

                    </div>

                    {form.questionType === "MCQ" && (

                        form.options.map((option, index) => (

                            <div
                                key={option.optionId}
                                className="flex gap-3 items-center"
                            >

                                <input
                                    type="radio"
                                    checked={option.correct}
                                    onChange={() => handleCorrectOption(index)}
                                />

                                <input
                                    value={option.optionText}
                                    onChange={(e) =>
                                        handleOptionChange(index, e.target.value)
                                    }
                                    className="border rounded-lg p-3 flex-1"
                                />

                            </div>

                        ))

                    )}

                    {form.questionType === "DESCRIPTIVE" && (

                        <textarea
                            rows={5}
                            name="expectedAnswer"
                            value={form.expectedAnswer}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />

                    )}

                    <textarea
                        rows={4}
                        name="explanation"
                        value={form.explanation}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            {loading ? "Updating..." : "Update Question"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}