import { useState } from "react";
import examService from "../../services/examService";
import { toast } from "sonner";

export default function CreateExamModal({
    open,
    onClose,
    onSuccess
}) {

    const initialForm = {
        title: "",
        description: "",
        subject: "",
        courseCode: "",
        durationInMinutes: "",
        totalMarks: "",
        startTime: "",
        endTime: ""
    };

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await examService.createExam(form);

            toast.success("Exam created successfully!");

            setForm(initialForm);

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to create exam."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Create New Exam

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        name="courseCode"
                        placeholder="Course Code"
                        value={form.courseCode}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="number"
                        name="durationInMinutes"
                        placeholder="Duration"
                        value={form.durationInMinutes}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="number"
                        name="totalMarks"
                        placeholder="Total Marks"
                        value={form.totalMarks}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="datetime-local"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="datetime-local"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="border rounded-lg p-3 col-span-2"
                        rows={4}
                    />

                    <div className="col-span-2 flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            {loading ? "Creating..." : "Create Exam"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}