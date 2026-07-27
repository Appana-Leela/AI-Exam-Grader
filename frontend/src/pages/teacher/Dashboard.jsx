import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";

import teacherAnalyticsService from "../../services/teacherAnalyticsService";

import StatCard from "../../components/dashboard/StatCard";
import AnalyticsBarChart from "../../components/dashboard/AnalyticsBarChart";
import AnalyticsPieChart from "../../components/dashboard/AnalyticsPieChart";
import RecentExamsTable from "../../components/dashboard/RecentExamsTable";
import QuickActions from "../../components/dashboard/QuickActions";
import SystemStatus from "../../components/dashboard/SystemStatus";
export default function Dashboard() {

    const [analytics, setAnalytics] = useState({

        totalExams: 0,

        publishedExams: 0,

        totalAttempts: 0,

        averageMarks: 0,

        passPercentage: 0,

        failPercentage: 0

    });

    const [recentExams, setRecentExams] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const analyticsResponse =
                await teacherAnalyticsService.getAnalytics();

            setAnalytics(
                analyticsResponse.data.data
            );

            const recentResponse =
                await teacherAnalyticsService.getRecentExams();

            setRecentExams(
                recentResponse.data.data
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load dashboard."
            );

        }

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Heading */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Teacher Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        AI Examination Analytics

                    </p>

                </div>

                {/* Statistics Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <StatCard
                        title="Total Exams"
                        value={analytics.totalExams}
                        color="blue"
                    />

                    <StatCard
                        title="Published Exams"
                        value={analytics.publishedExams}
                        color="green"
                    />

                    <StatCard
                        title="Attempts"
                        value={analytics.totalAttempts}
                        color="purple"
                    />

                    <StatCard
                        title="Average Marks"
                        value={analytics.averageMarks}
                        color="orange"
                    />

                    <StatCard
                        title="Pass %"
                        value={`${analytics.passPercentage}%`}
                        color="green"
                    />

                    <StatCard
                        title="Fail %"
                        value={`${analytics.failPercentage}%`}
                        color="red"
                    />

                </div>

                {/* Charts */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <AnalyticsBarChart
                        analytics={analytics}
                    />

                    <AnalyticsPieChart
                        analytics={analytics}
                    />

                </div>

                {/* Recent Exams */}

                <RecentExamsTable
                    exams={recentExams}
                />

            </div>

        </DashboardLayout>

    );

}