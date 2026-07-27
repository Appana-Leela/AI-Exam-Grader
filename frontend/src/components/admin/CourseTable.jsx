import {
    Pencil,
    Trash2,
    CheckCircle,
    XCircle,
    BookOpen,
    Clock3,
    Hash
} from "lucide-react";

export default function CourseTable({

    courses,

    onEdit,

    onDelete,

    onToggleStatus

}) {

    return (

        <div className="bg-white rounded-xl shadow border overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Course
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Code
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Duration
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Description
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            courses.map((course) => (

                                <tr
                                    key={course.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <BookOpen
                                                size={20}
                                                className="text-blue-600"
                                            />

                                            <div>

                                                <p className="font-semibold">

                                                    {course.courseName}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    ID : {course.id}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Hash size={16} />

                                            <span>

                                                {course.courseCode}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Clock3 size={16} />

                                            <span>

                                                {course.duration}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="text-gray-700">

                                            {

                                                course.description ||

                                                "-"

                                            }

                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {

                                            course.enabled ?

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                                                    Active

                                                </span>

                                                :

                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

                                                    Disabled

                                                </span>

                                        }

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button

                                                onClick={() => onEdit(course)}

                                                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100"

                                            >

                                                <Pencil

                                                    size={18}

                                                    className="text-blue-600"

                                                />

                                            </button>

                                            <button

                                                onClick={() => onDelete(course)}

                                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100"

                                            >

                                                <Trash2

                                                    size={18}

                                                    className="text-red-600"

                                                />

                                            </button>

                                            <button

                                                onClick={() => onToggleStatus(course)}

                                                className={`p-2 rounded-lg ${

                                                    course.enabled

                                                        ? "bg-yellow-50 hover:bg-yellow-100"

                                                        : "bg-green-50 hover:bg-green-100"

                                                }`}

                                            >

                                                {

                                                    course.enabled ?

                                                        <XCircle

                                                            size={18}

                                                            className="text-yellow-700"

                                                        />

                                                        :

                                                        <CheckCircle

                                                            size={18}

                                                            className="text-green-700"

                                                        />

                                                }

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}