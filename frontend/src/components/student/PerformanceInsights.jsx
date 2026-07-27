export default function PerformanceInsights({ result }) {

    const total = result?.totalMarksObtained || 0;

    const maxMarks = result?.totalMarks || 100;

    const percentage = Math.round((total / maxMarks) * 100);

    let performance = "Needs Improvement";

    let color = "text-red-600";

    if (percentage >= 85) {
        performance = "Excellent";
        color = "text-green-600";
    } else if (percentage >= 70) {
        performance = "Very Good";
        color = "text-blue-600";
    } else if (percentage >= 50) {
        performance = "Good";
        color = "text-orange-600";
    }

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                AI Performance Insights

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-blue-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Score

                    </p>

                    <h2 className="text-3xl font-bold text-blue-700 mt-2">

                        {total}

                    </h2>

                </div>

                <div className="bg-green-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Percentage

                    </p>

                    <h2 className="text-3xl font-bold text-green-700 mt-2">

                        {percentage}%

                    </h2>

                </div>

                <div className="bg-purple-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        Performance

                    </p>

                    <h2 className={`text-2xl font-bold mt-2 ${color}`}>

                        {performance}

                    </h2>

                </div>

                <div className="bg-orange-50 rounded-xl p-5">

                    <p className="text-gray-500">

                        AI Status

                    </p>

                    <h2 className="text-2xl font-bold text-orange-600 mt-2">

                        Evaluated

                    </h2>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-green-700 mb-4">

                        Strengths

                    </h3>

                    <ul className="list-disc pl-5 space-y-2">

                        <li>Good conceptual understanding</li>

                        <li>Attempted most questions</li>

                        <li>Clear presentation</li>

                    </ul>

                </div>

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-red-700 mb-4">

                        Areas to Improve

                    </h3>

                    <ul className="list-disc pl-5 space-y-2">

                        <li>Write detailed explanations</li>

                        <li>Use technical terminology</li>

                        <li>Improve answer structure</li>

                    </ul>

                </div>

                <div className="border rounded-xl p-5">

                    <h3 className="font-bold text-indigo-700 mb-4">

                        AI Recommendations

                    </h3>

                    <ul className="list-disc pl-5 space-y-2">

                        <li>Practice descriptive questions</li>

                        <li>Revise weak concepts</li>

                        <li>Take weekly mock tests</li>

                    </ul>

                </div>

            </div>

        </div>

    );

}