import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from "recharts";

export default function PerformanceChart({

    data

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">

                Subject Performance

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="subject"/>

                    <YAxis/>

                    <Tooltip/>

                    <Legend/>

                    <Bar
                        dataKey="average"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}