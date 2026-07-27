export default function AIPerformanceSummary({

    result

}) {

    const total = result?.totalMarksObtained ?? 0;

    const percentage = result?.percentage ?? 0;

    let grade = "F";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                AI Performance Summary

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-blue-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Percentage

                    </p>

                    <h2 className="text-4xl font-bold text-blue-700 mt-3">

                        {percentage}%

                    </h2>

                </div>

                <div className="bg-green-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Grade

                    </p>

                    <h2 className="text-4xl font-bold text-green-700 mt-3">

                        {grade}

                    </h2>

                </div>

                <div className="bg-purple-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Marks Obtained

                    </p>

                    <h2 className="text-4xl font-bold text-purple-700 mt-3">

                        {total}

                    </h2>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-green-700">

                        Strengths

                    </h3>

                    <ul className="list-disc pl-5 mt-4 space-y-2">

                        <li>Good conceptual understanding</li>

                        <li>Answered most questions correctly</li>

                        <li>Maintained answer quality</li>

                    </ul>

                </div>

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-red-700">

                        Weaknesses

                    </h3>

                    <ul className="list-disc pl-5 mt-4 space-y-2">

                        <li>Need better explanations</li>

                        <li>Improve keyword usage</li>

                        <li>Increase answer depth</li>

                    </ul>

                </div>

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-indigo-700">

                        Recommendations

                    </h3>

                    <ul className="list-disc pl-5 mt-4 space-y-2">

                        <li>Practice descriptive questions</li>

                        <li>Revise important topics</li>

                        <li>Attempt more mock exams</li>

                    </ul>

                </div>

            </div>

        </div>

    );

}