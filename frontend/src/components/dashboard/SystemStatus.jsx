export default function SystemStatus() {

    const status = [

        {
            title: "Backend",
            value: "Running",
            color: "text-green-600"
        },

        {
            title: "AI Service",
            value: "Connected",
            color: "text-green-600"
        },

        {
            title: "Database",
            value: "Online",
            color: "text-green-600"
        }

    ];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                System Status

            </h2>

            <div className="space-y-4">

                {

                    status.map(item => (

                        <div
                            key={item.title}
                            className="flex justify-between border-b pb-2"
                        >

                            <span>

                                {item.title}

                            </span>

                            <span className={item.color}>

                                {item.value}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}