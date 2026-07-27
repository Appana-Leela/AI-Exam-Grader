import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import studentExamService from "../../services/studentExamService";
import studentAttemptService from "../../services/studentAttemptService";
import { toast } from "sonner";

export default function StudentExams() {

    const navigate = useNavigate();

    const [exams, setExams] = useState([]);

    useEffect(() => {

        loadExams();

    }, []);

    async function loadExams() {

        try {

            const response =
                await studentExamService.getAvailableExams();

            setExams(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load exams.");

        }

    }

    async function handleStartExam(examId) {

        try {

            const response =
                await studentAttemptService.startExam(examId);

            toast.success("Exam Started Successfully");

            navigate(
                `/student/exam/${response.data.data.id}`
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to start exam."
            );

        }

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">

                Available Exams

            </h1>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {exams.map((exam) => (

                    <div
                        key={exam.id}
                        className="bg-white rounded-xl shadow p-6"
                    >

                        <h2 className="text-xl font-semibold">

                            {exam.title}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            {exam.subject}

                        </p>

                        <button

                            onClick={() => handleStartExam(exam.id)}

                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                        >

                            Start Exam

                        </button>

                    </div>

                ))}

            </div>

        </DashboardLayout>

    );

}