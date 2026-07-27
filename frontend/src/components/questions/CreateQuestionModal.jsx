import { useEffect, useState } from "react";
import { toast } from "sonner";
import questionService from "../../services/questionService";

export default function CreateQuestionModal({
    open,
    examId,
    onClose,
    onSuccess
}) {

    const initialForm = {
        examId: examId || "",
        questionText: "",
        questionType: "MCQ",
        difficultyLevel: "EASY",
        marks: 1,
        expectedAnswer: "",
        explanation: "",
        options: [
            {
                optionId: "A",
                optionText: "",
                correct: true
            },
            {
                optionId: "B",
                optionText: "",
                correct: false
            },
            {
                optionId: "C",
                optionText: "",
                correct: false
            },
            {
                optionId: "D",
                optionText: "",
                correct: false
            }
        ]
    };

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({
            ...initialForm,
            examId
        });
    }, [examId]);

    if (!open) return null;

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

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            console.log("Question Payload:", form);

            await questionService.createQuestion(form);

            toast.success("Question created successfully!");

            setForm({
                ...initialForm,
                examId
            });

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to create question."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-6">
                    Create Question
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Question
                        </label>

                        <textarea
                            name="questionText"
                            rows={4}
                            value={form.questionText}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                            required
                        />

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <div>

                            <label>Question Type</label>

                            <select
                                name="questionType"
                                value={form.questionType}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            >
                                <option value="MCQ">MCQ</option>
                                <option value="DESCRIPTIVE">DESCRIPTIVE</option>
                            </select>

                        </div>

                        <div>

                            <label>Difficulty</label>

                            <select
                                name="difficultyLevel"
                                value={form.difficultyLevel}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>

                        </div>

                        <div>

                            <label>Marks</label>

                            <input
                                type="number"
                                name="marks"
                                value={form.marks}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                                min={1}
                            />

                        </div>

                    </div>

                    {form.questionType === "MCQ" && (

                        <div>

                            <h3 className="font-semibold mb-3">
                                Options
                            </h3>

                            {form.options.map((option, index) => (

                                <div
                                    key={option.optionId}
                                    className="flex items-center gap-3 mb-3"
                                >

                                    <input
                                        type="radio"
                                        checked={option.correct}
                                        onChange={() => handleCorrectOption(index)}
                                    />

                                    <input
                                        type="text"
                                        value={option.optionText}
                                        onChange={(e) =>
                                            handleOptionChange(index, e.target.value)
                                        }
                                        placeholder={`Option ${option.optionId}`}
                                        className="flex-1 border rounded-lg p-3"
                                    />

                                </div>

                            ))}

                        </div>

                    )}

                    {form.questionType === "DESCRIPTIVE" && (

                        <div>

                            <label className="font-medium">
                                Expected Answer
                            </label>

                            <textarea
                                rows={5}
                                name="expectedAnswer"
                                value={form.expectedAnswer}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                    )}

                    <div>

                        <label className="font-medium">
                            Explanation
                        </label>

                        <textarea
                            rows={4}
                            name="explanation"
                            value={form.explanation}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

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
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Save Question"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}