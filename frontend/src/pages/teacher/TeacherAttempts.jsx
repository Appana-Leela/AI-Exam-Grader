import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";
import teacherAttemptService from "../../services/teacherAttemptService";

import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function TeacherAttempts() {

    const { examId } = useParams();

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (examId) {

            loadAttempts();

        }

    }, [examId]);

    async function loadAttempts() {

        try {

            const response =
                await teacherAttemptService.getAttempts(examId);

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

            case "SUBMITTED":

                return "bg-yellow-100 text-yellow-700";

            case "EVALUATED":

                return "bg-green-100 text-green-700";

            default:

                return "bg-gray-100 text-gray-700";

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    Loading Attempts...

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

                        "Exams",

                        "Attempts"

                    ]}

                />

                <div className="bg-white rounded-2xl shadow p-6">

                    <h1 className="text-3xl font-bold">

                        Student Attempts

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Review all submitted examination attempts.

                    </p>

                </div>

                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">

                                    Student

                                </th>

                                <th className="p-4 text-left">

                                    Submitted

                                </th>

                                <th className="p-4 text-left">

                                    Marks

                                </th>

                                <th className="p-4 text-left">

                                    Status

                                </th>

                                <th className="p-4 text-center">

                                    Action

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                attempts.map(attempt => (

                                    <tr

                                        key={attempt.attemptId}

                                        className="border-t hover:bg-gray-50"

                                    >

                                        <td className="p-4">

                                            {attempt.studentEmail}

                                        </td>

                                        <td className="p-4">

                                            {

                                                attempt.submittedAt

                                                    ?

                                                    new Date(

                                                        attempt.submittedAt

                                                    ).toLocaleString()

                                                    :

                                                    "-"

                                            }

                                        </td>

                                        <td className="p-4 font-semibold">

                                            {attempt.marks ?? 0}

                                        </td>

                                        <td className="p-4">

                                            <span

                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(attempt.status)}`}

                                            >

                                                {attempt.status}

                                            </span>

                                        </td>

                                        <td className="p-4 text-center">

                                            <button

                                                onClick={() =>

                                                    navigate(

                                                        `/teacher/attempts/${attempt.attemptId}/evaluate`

                                                    )

                                                }

                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                                            >

                                                Evaluate

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>

    );

}