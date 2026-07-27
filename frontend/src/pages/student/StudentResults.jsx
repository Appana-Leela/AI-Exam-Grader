import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import studentAttemptService from "../../services/studentAttemptService";
import { toast } from "sonner";

export default function StudentResults() {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResults();
    }, []);

    async function loadResults() {

        try {

            const response =
                await studentAttemptService.getMyAttempts();

            const submitted =
                response.data.data.filter(
                    attempt => attempt.status === "SUBMITTED"
                );

            setAttempts(submitted);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load results.");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center py-20">

                    Loading Results...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                My Results

            </h1>

            <div className="space-y-5">

                {

                    attempts.map(attempt => (

                        <div

                            key={attempt.id}

                            className="bg-white rounded-xl shadow p-6 flex justify-between items-center"

                        >

                            <div>

                                <h2 className="text-xl font-bold">

                                    {attempt.examTitle}

                                </h2>

                                <p className="text-gray-500">

                                    {attempt.subject}

                                </p>

                                <p className="mt-2">

                                    Score :

                                    <span className="font-bold ml-2">

                                        {attempt.totalMarksObtained}

                                    </span>

                                </p>

                            </div>

                            <button

                                onClick={() =>
                                    navigate(`/student/results/${attempt.id}`)
                                }

                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                            >

                                View Details

                            </button>

                        </div>

                    ))

                }

            </div>

        </DashboardLayout>

    );

}