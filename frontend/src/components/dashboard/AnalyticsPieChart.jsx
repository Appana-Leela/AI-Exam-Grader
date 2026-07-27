import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

export default function AnalyticsPieChart({ analytics }) {

    const data = [

        {

            name: "Pass",

            value: analytics.passPercentage

        },

        {

            name: "Fail",

            value: analytics.failPercentage

        }

    ];

    const COLORS = [

        "#16a34a",

        "#dc2626"

    ];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Student Performance

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        outerRadius={110}

                        label

                    >

                        {

                            data.map((entry,index)=>(

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip/>

                    <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}