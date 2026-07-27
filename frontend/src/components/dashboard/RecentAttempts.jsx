export default function RecentAttempts({

    attempts

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Recent Attempts

            </h2>

            <table className="w-full">

                <thead>

                <tr className="border-b">

                    <th className="text-left py-3">

                        Student

                    </th>

                    <th>

                        Exam

                    </th>

                    <th>

                        Marks

                    </th>

                </tr>

                </thead>

                <tbody>

                {

                    attempts.map(

                        (

                            item,

                            index

                        )=>(

                            <tr
                                key={index}
                                className="border-b"
                            >

                                <td className="py-3">

                                    {item.studentEmail}

                                </td>

                                <td>

                                    {item.examTitle}

                                </td>

                                <td>

                                    {item.marks}

                                </td>

                            </tr>

                        )

                    )

                }

                </tbody>

            </table>

        </div>

    );

}