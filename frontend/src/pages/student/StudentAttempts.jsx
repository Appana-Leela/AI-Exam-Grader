import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ClipboardCheck,
    Calendar,
    BookOpen,
    Eye,
    PlayCircle
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import studentAttemptService from "../../services/studentAttemptService";
import { toast } from "sonner";

export default function StudentAttempts() {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAttempts();
    }, []);

    async function loadAttempts() {

        try {

            const response =
                await studentAttemptService.getMyAttempts();

            setAttempts(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load attempts.");

        }

        finally {

            setLoading(false);

        }

    }

    function getStatusColor(status) {

        switch (status) {

            case "STARTED":
                return "bg-blue-100 text-blue-700";

            case "IN_PROGRESS":
                return "bg-yellow-100 text-yellow-700";

            case "SUBMITTED":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    <div className="text-center">

                        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto"></div>

                        <p className="mt-4 text-lg">

                            Loading Attempts...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        My Attempts

                    </h1>

                    <p className="text-gray-500 mt-2">

                        View all examinations you have attempted.

                    </p>

                </div>

            </div>

            {

                attempts.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-12 text-center">

                        <ClipboardCheck
                            size={70}
                            className="mx-auto text-gray-400"
                        />

                        <h2 className="text-2xl font-semibold mt-5">

                            No Attempts Yet

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Start an examination to see your attempts here.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {

                            attempts.map((attempt) => (

                                <div

                                    key={attempt.id}

                                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"

                                >

                                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                                        <div className="flex-1">

                                            <h2 className="text-2xl font-bold text-slate-800">

                                                {attempt.examTitle || "Examination"}

                                            </h2>

                                            <div className="flex flex-wrap gap-5 mt-4 text-gray-600">

                                                <div className="flex items-center gap-2">

                                                    <BookOpen size={18} />

                                                    {attempt.subject}

                                                </div>

                                                <div>

                                                    {attempt.courseCode}

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-2 mt-5 text-gray-500">

                                                <Calendar size={18} />

                                                {

                                                    new Date(
                                                        attempt.startedAt
                                                    ).toLocaleString()

                                                }

                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-6">

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Marks

                                                    </p>

                                                    <p className="font-bold text-lg">

                                                        {attempt.totalMarksObtained}

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Status

                                                    </p>

                                                    <span

                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(attempt.status)}`}

                                                    >

                                                        {attempt.status}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex items-center">

                                            {

                                                attempt.status === "SUBMITTED"

                                                    ? (

                                                        <button
                                                            onClick={() =>
                                                                navigate(`/student/results/${attempt.id}`)
                                                            }
                                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                                                        >
                                                            View Result
                                                        </button>

                                                    )

                                                    : (

                                                        <button

                                                            onClick={() =>
                                                                navigate(`/student/exam/${attempt.id}`)
                                                            }

                                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                                                        >

                                                            <PlayCircle size={18} />

                                                            Resume Exam

                                                        </button>

                                                    )

                                            }

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </DashboardLayout>

    );

}