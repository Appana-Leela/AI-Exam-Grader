export default function GeneratedQuestionCard({

    question,

    index

}) {

    return (

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">

                    Question {index + 1}

                </h2>

                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">

                    {question.marks} Marks

                </span>

            </div>

            <div className="mt-6">

                <p className="font-semibold">

                    Question

                </p>

                <div className="mt-2 bg-slate-50 rounded-lg p-4 whitespace-pre-wrap">

                    {question.questionText}

                </div>

            </div>

            <div className="mt-6">

                <p className="font-semibold text-green-700">

                    Expected Answer

                </p>

                <div className="mt-2 bg-green-50 rounded-lg p-4 whitespace-pre-wrap">

                    {

                        question.expectedAnswer ||

                        "Not Generated"

                    }

                </div>

            </div>

            <div className="mt-6">

                <p className="font-semibold text-indigo-700">

                    Evaluation Rubric

                </p>

                <div className="mt-2 bg-indigo-50 rounded-lg p-4 whitespace-pre-wrap">

                    {

                        question.evaluationRubric ||

                        "No rubric generated."

                    }

                </div>

            </div>

            <div className="mt-6">

                <p className="font-semibold text-orange-700">

                    Keywords

                </p>

                <div className="flex flex-wrap gap-2 mt-3">

                    {

                        question.keywords?.length > 0

                            ?

                            question.keywords.map(

                                (

                                    keyword,

                                    idx

                                ) => (

                                    <span

                                        key={idx}

                                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"

                                    >

                                        {keyword}

                                    </span>

                                )

                            )

                            :

                            <span className="text-gray-500">

                                No keywords

                            </span>

                    }

                </div>

            </div>

            <div className="grid grid-cols-3 gap-5 mt-8">

                <div>

                    <p className="text-sm text-gray-500">

                        Difficulty

                    </p>

                    <p className="font-semibold">

                        {question.difficultyLevel}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Question Type

                    </p>

                    <p className="font-semibold">

                        {question.questionType}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Bloom Level

                    </p>

                    <p className="font-semibold">

                        {

                            question.bloomLevel ||

                            "Understand"

                        }

                    </p>

                </div>

            </div>

        </div>

    );

}