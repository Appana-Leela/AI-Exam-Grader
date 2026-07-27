import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";

import studentResultService from "../../services/studentResultService";

import ResultSummaryCard from "../../components/student/ResultSummaryCard";
import QuestionResultCard from "../../components/student/QuestionResultCard";

import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import AIPerformanceSummary from "../../components/student/AIPerformanceSummary";
import DownloadPdfButton from "../../components/common/DownloadPdfButton";
import PerformanceInsights from "../../components/student/PerformanceInsights";

export default function StudentResultDetails() {

    const { attemptId } = useParams();

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadResult();

    }, []);

    async function loadResult() {

        try {

            const response =
                await studentResultService.getResult(
                    attemptId
                );

            setResult(
                response.data.data
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load result."
            );

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    <div className="text-center">

                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>

                        <p className="mt-5 text-lg">

                            Loading Result...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <BackButton />

                <Breadcrumb

                    items={[

                        "Dashboard",

                        "My Attempts",

                        "Result"

                    ]}

                />

                <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold">

                                Examination Result

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Detailed AI-powered evaluation report.

                            </p>

                        </div>

                        <DownloadPdfButton

                            attemptId={attemptId}

                        />

                    </div>

                </div>

                <ResultSummaryCard

                    result={result}

                />
                <PerformanceInsights

                    result={result}

                />

                <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <div>

                            <h2 className="text-2xl font-bold">

                                Question Wise Evaluation

                            </h2>

                            <p className="text-gray-500 mt-1">

                                Teacher remarks and AI feedback.

                            </p>

                        </div>

                    </div>

                    <div className="space-y-6">

                        {

                            result.answers.map(

                                (answer,index)=>(

                                    <QuestionResultCard

                                        key={index}

                                        answer={answer}

                                        index={index}

                                    />

                                )

                            )

                        }

                    </div>

                </div>

                    <AIPerformanceSummary

                    result={result}

                />

            </div>

        </DashboardLayout>

    );

}