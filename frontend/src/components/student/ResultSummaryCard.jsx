export default function ResultSummaryCard({ result }) {

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold">

                {result.examTitle}

            </h1>

            <p className="text-gray-500 mt-2">

                {result.subject}

            </p>

            <div className="grid md:grid-cols-5 gap-6 mt-8">

                <div>

                    <h3 className="text-gray-500">

                        Score

                    </h3>

                    <p className="text-3xl font-bold">

                        {result.totalMarksObtained ?? 0} / {result.totalMarks ?? 0}

                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500">

                        Percentage

                    </h3>

                    <p className="text-3xl font-bold text-blue-600">

                        {Number(result.percentage ?? 0).toFixed(2)}%

                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500">

                        Grade

                    </h3>

                    <p className="text-3xl font-bold text-purple-600">

                        {result.grade}

                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500">

                        Result

                    </h3>

                    <p

                        className={

                            result.result === "PASS"

                                ? "text-green-600 text-3xl font-bold"

                                : "text-red-600 text-3xl font-bold"

                        }

                    >

                        {result.result}

                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500">

                        Questions

                    </h3>

                    <p className="text-3xl font-bold">

                        {result.answers?.length ?? 0}

                    </p>

                </div>

            </div>

        </div>

    );

}