export default function ScoreProgress({ percentage }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Overall Performance

            </h2>

            <div className="w-full bg-gray-200 rounded-full h-5">

                <div

                    className="bg-green-600 h-5 rounded-full transition-all duration-700"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            <div className="text-center mt-5 text-2xl font-bold">

                {percentage}%

            </div>

        </div>

    );

}