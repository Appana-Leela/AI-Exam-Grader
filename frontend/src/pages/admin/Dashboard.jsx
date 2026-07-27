import { useEffect, useState } from "react";
import { getDashboard } from "../../services/adminApi";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import api from "../../api/axios";
export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboard();

                console.log("Dashboard Data:", data);

                setStats(data);

            } catch (err) {

                console.error("Dashboard Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (
            <LoadingSpinner
                text="Loading Dashboard..."
            />
        );

    }

    if (error) {

        return (
            <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
                {error}
            </div>
        );

    }

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">
                        Total Teachers
                    </h2>

                    <p className="text-4xl font-bold text-blue-600 mt-2">
                        {stats.totalTeachers}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">
                        Total Students
                    </h2>

                    <p className="text-4xl font-bold text-green-600 mt-2">
                        {stats.totalStudents}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">
                        Total Exams
                    </h2>

                    <p className="text-4xl font-bold text-purple-600 mt-2">
                        {stats.totalExams}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">
                        Published Exams
                    </h2>

                    <p className="text-4xl font-bold text-orange-600 mt-2">
                        {stats.totalPublishedExams}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-gray-500">
                        Draft Exams
                    </h2>

                    <p className="text-4xl font-bold text-red-600 mt-2">
                        {stats.totalDraftExams}
                    </p>
                </div>

            </div>

        </div>

    );

}