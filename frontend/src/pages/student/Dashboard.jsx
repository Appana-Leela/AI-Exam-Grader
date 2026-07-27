import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import studentDashboardService from "../../services/studentDashboardService";
import { toast } from "sonner";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState({
        availableExams: 0,
        completedExams: 0,
        averageScore: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const response =
                await studentDashboardService.getDashboard();

            setDashboard(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-96">

                    <div className="text-center">

                        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto"></div>

                        <p className="mt-4">

                            Loading Dashboard...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">

                        Student Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Welcome to the AI Examination Portal

                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-lg font-semibold">

                            Available Exams

                        </h2>

                        <p className="text-4xl font-bold mt-4 text-blue-600">

                            {dashboard.availableExams}

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-lg font-semibold">

                            Completed Exams

                        </h2>

                        <p className="text-4xl font-bold mt-4 text-green-600">

                            {dashboard.completedExams}

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-lg font-semibold">

                            Average Score

                        </h2>

                        <p className="text-4xl font-bold mt-4 text-purple-600">

                            {dashboard.averageScore}%

                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}