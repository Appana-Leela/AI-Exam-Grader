import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function AnalyticsBarChart({ analytics }) {

    const data = [

        {
            name: "Total Exams",
            value: analytics.totalExams
        },

        {
            name: "Published",
            value: analytics.publishedExams
        },

        {
            name: "Attempts",
            value: analytics.totalAttempts
        },

        {
            name: "Average",
            value: analytics.averageMarks
        }

    ];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Examination Statistics

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="name"/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar
                        dataKey="value"
                        radius={[8,8,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}