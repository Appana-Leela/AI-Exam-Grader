import { BookOpen, Clock3 } from "lucide-react";

export default function ExamHeader({

    examTitle,
    subject,
    totalQuestions,
    answeredQuestions,
    timer

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">

                        {examTitle}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {subject}

                    </p>

                </div>

                <div className="text-right">

                    <div className="flex items-center justify-end gap-2">

                        <Clock3 className="text-red-600" />

                        <span className="text-2xl font-bold text-red-600">

                            <div>

                                {timer}

                            </div>

                        </span>

                    </div>

                    <p className="text-gray-500 mt-2">

                        Time Remaining

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-6">

                <div className="border rounded-lg p-4 flex items-center gap-3">

                    <BookOpen className="text-blue-600" />

                    <div>

                        <p className="text-gray-500 text-sm">

                            Total Questions

                        </p>

                        <p className="text-xl font-bold">

                            {totalQuestions}

                        </p>

                    </div>

                </div>

                <div className="border rounded-lg p-4 flex items-center gap-3">

                    <BookOpen className="text-green-600" />

                    <div>

                        <p className="text-gray-500 text-sm">

                            Answered

                        </p>

                        <p className="text-xl font-bold">

                            {answeredQuestions}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}