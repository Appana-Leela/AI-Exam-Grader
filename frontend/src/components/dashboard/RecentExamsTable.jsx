export default function RecentExamsTable({ exams }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Recent Exams

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left p-3">Title</th>

                        <th className="text-left p-3">Subject</th>

                        <th className="text-left p-3">Status</th>

                        <th className="text-center p-3">Attempts</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        exams.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="text-center py-8 text-gray-500"
                                >

                                    No Exams Found

                                </td>

                            </tr>

                        )

                        :

                        exams.map(exam => (

                            <tr
                                key={exam.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-3">

                                    {exam.title}

                                </td>

                                <td className="p-3">

                                    {exam.subject}

                                </td>

                                <td className="p-3">

                                    <span
                                        className={
                                            exam.published
                                            ? "text-green-600 font-semibold"
                                            : "text-yellow-600 font-semibold"
                                        }
                                    >

                                        {exam.status}

                                    </span>

                                </td>

                                <td className="text-center p-3">

                                    {exam.attempts}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}