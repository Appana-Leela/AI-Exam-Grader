import { Link } from "react-router-dom";

export default function QuickActions() {

    const actions = [

        {
            title: "Create Exam",
            path: "/teacher/exams/create",
            color: "bg-blue-600"
        },

        {
            title: "Generate AI Questions",
            path: "/teacher/ai-question-generator",
            color: "bg-indigo-600"
        },

        {
            title: "Evaluate Attempts",
            path: "/teacher/evaluations",
            color: "bg-green-600"
        },

        {
            title: "View Results",
            path: "/teacher/results",
            color: "bg-orange-600"
        }

    ];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Quick Actions

            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                {

                    actions.map(action => (

                        <Link
                            key={action.title}
                            to={action.path}
                            className={`${action.color} text-white rounded-lg p-5 text-center font-semibold hover:opacity-90 transition`}
                        >

                            {action.title}

                        </Link>

                    ))

                }

            </div>

        </div>

    );

}