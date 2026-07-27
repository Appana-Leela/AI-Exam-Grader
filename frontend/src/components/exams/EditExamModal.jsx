import { useEffect, useState } from "react";
import examService from "../../services/examService";
import { toast } from "sonner";

export default function EditExamModal({
    open,
    exam,
    onClose,
    onSuccess
}) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        subject: "",
        courseCode: "",
        durationInMinutes: "",
        totalMarks: "",
        startTime: "",
        endTime: ""
    });

    useEffect(() => {

        if (exam) {

            setForm({
                title: exam.title || "",
                description: exam.description || "",
                subject: exam.subject || "",
                courseCode: exam.courseCode || "",
                durationInMinutes: exam.durationInMinutes || "",
                totalMarks: exam.totalMarks || "",
                startTime: exam.startTime?.slice(0,16) || "",
                endTime: exam.endTime?.slice(0,16) || ""
            });

        }

    }, [exam]);

    if (!open || !exam) return null;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    async function handleSubmit(e){

        e.preventDefault();

        try{

            await examService.updateExam(exam.id, form);

            toast.success("Exam updated successfully!");

            onSuccess();

            onClose();

        }catch(error){

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update exam."
            );

        }

    }

    return(

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Exam
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border rounded-lg p-3"
                    />

                    <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="border rounded-lg p-3"
                    />

                    <input
                        name="courseCode"
                        value={form.courseCode}
                        onChange={handleChange}
                        placeholder="Course Code"
                        className="border rounded-lg p-3"
                    />

                    <input
                        name="durationInMinutes"
                        type="number"
                        value={form.durationInMinutes}
                        onChange={handleChange}
                        placeholder="Duration"
                        className="border rounded-lg p-3"
                    />

                    <input
                        name="totalMarks"
                        type="number"
                        value={form.totalMarks}
                        onChange={handleChange}
                        placeholder="Total Marks"
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="datetime-local"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="datetime-local"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border rounded-lg p-3 col-span-2"
                        rows={4}
                    />

                    <div className="col-span-2 flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Update Exam
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}