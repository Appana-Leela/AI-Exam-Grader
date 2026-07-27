import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";

export default function BottomNavigation({

    currentQuestion,
    totalQuestions,
    onPrevious,
    onNext,
    onSave,
    onSubmit,
    saving

}) {

    return (

        <div className="bg-white rounded-xl shadow mt-6 p-5">

            <div className="flex justify-between items-center">

                <button

                    disabled={currentQuestion === 0}

                    onClick={onPrevious}

                    className="flex items-center gap-2 border px-5 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"

                >

                    <ArrowLeft size={18} />

                    Previous

                </button>

                <button

                    disabled={saving}

                    onClick={onSave}

                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"

                >

                    <Save size={18} />

                    Save Answer

                </button>

                {

                    currentQuestion === totalQuestions - 1 ? (

                        <button

                            onClick={onSubmit}

                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"

                        >

                            <Send size={18} />

                            Submit Exam

                        </button>

                    ) : (

                        <button

                            onClick={onNext}

                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                        >

                            Next

                            <ArrowRight size={18} />

                        </button>

                    )

                }

            </div>

        </div>

    );

}