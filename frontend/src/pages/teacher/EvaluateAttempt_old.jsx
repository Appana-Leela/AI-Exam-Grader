import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import teacherAttemptService from "../../services/teacherAttemptService";
import { toast } from "sonner";

export default function EvaluateAttempt() {

    const { attemptId } = useParams();

    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAttempt();
    }, []);

    async function loadAttempt() {

        try {

            const response =
                await teacherAttemptService.getAttempt(
                    attemptId
                );

            setAttempt(response.data.data);

        } catch (error) {

            toast.error("Unable to load attempt.");

        } finally {

            setLoading(false);

        }

    }

    async function saveEvaluation() {

        try {

            const evaluations =
                attempt.answers.map(answer => ({

                    questionId: answer.questionId,

                    marksAwarded:
                        Number(answer.marksAwarded),

                    remarks:
                        answer.teacherRemarks

                }));

            await teacherAttemptService.evaluateAttempt(

                attemptId,

                { evaluations }

            );

            toast.success(
                "Evaluation Saved Successfully"
            );

            navigate(-1);

        } catch (error) {

            toast.error(
                "Unable to save evaluation."
            );

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center py-20">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-3xl font-bold">

                        Evaluate Attempt

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {attempt.studentEmail}

                    </p>

                </div>

                {

                    attempt.answers.map((answer, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-6 space-y-4"
                        >

                            <h2 className="font-bold">

                                Question {index + 1}

                            </h2>

                            <div>

                                <label>

                                    Marks

                                </label>

                                <input
                                    type="number"
                                    className="border rounded-lg w-full mt-2 p-2"
                                    value={answer.marksAwarded}
                                    onChange={(e)=>{

                                        const updated=[...attempt.answers];

                                        updated[index].marksAwarded=
                                            e.target.value;

                                        setAttempt({

                                            ...attempt,

                                            answers:updated

                                        });

                                    }}
                                />

                            </div>

                            <div>

                                <label>

                                    Remarks

                                </label>

                                <textarea
                                    rows={3}
                                    className="border rounded-lg w-full mt-2 p-2"
                                    value={
                                        answer.teacherRemarks || ""
                                    }
                                    onChange={(e)=>{

                                        const updated=[...attempt.answers];

                                        updated[index].teacherRemarks=
                                            e.target.value;

                                        setAttempt({

                                            ...attempt,

                                            answers:updated

                                        });

                                    }}
                                />

                            </div>

                        </div>

                    ))

                }

                <button
                    onClick={saveEvaluation}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                >

                    Save Evaluation

                </button>

            </div>

        </DashboardLayout>

    );

}