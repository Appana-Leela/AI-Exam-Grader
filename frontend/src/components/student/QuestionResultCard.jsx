export default function QuestionResultCard({

    answer,

    index

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">

                Question {index + 1}

            </h2>

            <div className="space-y-3">

                <div>

                    <strong>

                        Marks Awarded :

                    </strong>

                    <span className="ml-2">

                        {answer.marksAwarded ?? 0}

                    </span>

                </div>

                {

                    answer.teacherRemarks && (

                        <div>

                            <strong>

                                Teacher Remarks

                            </strong>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-2 whitespace-pre-wrap">

                                {answer.teacherRemarks}

                            </div>

                        </div>

                    )

                }

                {

                    answer.aiFeedback && (

                        <div>

                            <strong className="text-blue-700">

                                AI Feedback

                            </strong>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2 whitespace-pre-wrap">

                                {answer.aiFeedback}

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}