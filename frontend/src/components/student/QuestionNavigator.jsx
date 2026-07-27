export default function QuestionNavigator({

    questions,
    currentIndex,
    onSelect

}) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h3 className="font-bold mb-4">

                Questions

            </h3>

            <div className="grid grid-cols-5 gap-3">

                {questions.map((question, index) => (

                    <button

                        key={question.id}

                        onClick={() => onSelect(index)}

                        className={`w-10 h-10 rounded-lg font-semibold ${
                            currentIndex === index
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}

                    >

                        {index + 1}

                    </button>

                ))}

            </div>

        </div>

    );

}