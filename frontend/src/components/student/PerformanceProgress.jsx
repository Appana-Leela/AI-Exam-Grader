export default function PerformanceProgress({

    percentage

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Overall Performance

            </h2>

            <div className="w-full bg-gray-200 rounded-full h-6">

                <div

                    className="bg-green-600 h-6 rounded-full"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            <div className="mt-4 text-center text-2xl font-bold">

                {percentage}%

            </div>

        </div>

    );

}