import {
    Pencil,
    Rocket,
    Trash2,
    CircleHelp,
    Users
} from "lucide-react";

export default function ExamActions({

    exam,

    onEdit,

    onPublish,

    onDelete,

    onQuestions,

    onAttempts

}) {

    return (

        <div className="flex gap-2 justify-center">

            <button

                onClick={() => onQuestions(exam.id)}

                className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200"

                title="Questions"

            >

                <CircleHelp
                    size={18}
                    className="text-purple-700"
                />

            </button>

            <button

                onClick={() => onAttempts(exam.id)}

                className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200"

                title="Student Attempts"

            >

                <Users
                    size={18}
                    className="text-orange-700"
                />

            </button>

            <button

                onClick={() => onEdit(exam)}

                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"

                title="Edit"

            >

                <Pencil
                    size={18}
                    className="text-blue-700"
                />

            </button>

            <button

                onClick={() => onPublish(exam.id)}

                className="p-2 rounded-lg bg-green-100 hover:bg-green-200"

                title="Publish"

            >

                <Rocket
                    size={18}
                    className="text-green-700"
                />

            </button>

            <button

                onClick={() => onDelete(exam.id)}

                className="p-2 rounded-lg bg-red-100 hover:bg-red-200"

                title="Delete"

            >

                <Trash2
                    size={18}
                    className="text-red-700"
                />

            </button>

        </div>

    );

}