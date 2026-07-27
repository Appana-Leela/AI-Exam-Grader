import { useState } from "react";

export default function CreateQuestionModal({

    open,
    onClose

}) {

    const [questionType, setQuestionType] = useState("MCQ");

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl p-8 w-[900px]">

                <h2 className="text-2xl font-bold mb-6">

                    Create Question

                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <textarea
                        className="border rounded-lg p-3 col-span-2"
                        rows={4}
                        placeholder="Question"
                    />

                    <select
                        className="border rounded-lg p-3"
                        value={questionType}
                        onChange={(e)=>setQuestionType(e.target.value)}
                    >
                        <option>MCQ</option>
                        <option>DESCRIPTIVE</option>
                    </select>

                    <select
                        className="border rounded-lg p-3"
                    >
                        <option>EASY</option>
                        <option>MEDIUM</option>
                        <option>HARD</option>
                    </select>

                    <input
                        className="border rounded-lg p-3"
                        placeholder="Marks"
                        type="number"
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Save Question
                    </button>

                </div>

            </div>

        </div>

    );

}