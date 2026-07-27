import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({

    title,

    value,

    icon: Icon,

    color = "blue",

    trend,

    subtitle

}) {

    const colors = {

        blue: "bg-blue-100 text-blue-600",

        green: "bg-green-100 text-green-600",

        red: "bg-red-100 text-red-600",

        orange: "bg-orange-100 text-orange-600",

        purple: "bg-purple-100 text-purple-600"

    };

    return (

        <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-slate-200 p-5">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm font-medium">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-slate-800">

                        {value}

                    </h2>

                    {

                        subtitle && (

                            <p className="text-xs text-gray-400 mt-2">

                                {subtitle}

                            </p>

                        )

                    }

                </div>

                <div

                    className={`p-4 rounded-xl ${colors[color]}`}

                >

                    {

                        Icon && (

                            <Icon size={28} />

                        )

                    }

                </div>

            </div>

            {

                trend !== undefined && (

                    <div className="flex items-center mt-5">

                        {

                            trend >= 0

                                ?

                                <TrendingUp

                                    size={18}

                                    className="text-green-600"

                                />

                                :

                                <TrendingDown

                                    size={18}

                                    className="text-red-600"

                                />

                        }

                        <span

                            className={`ml-2 text-sm font-semibold ${
                                trend >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}

                        >

                            {Math.abs(trend)}%

                        </span>

                        <span className="ml-2 text-gray-500 text-sm">

                            compared to last month

                        </span>

                    </div>

                )

            }

        </div>

    );

}