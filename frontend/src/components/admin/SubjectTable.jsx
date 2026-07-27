import {
    Pencil,
    Trash2,
    CheckCircle,
    XCircle,
    BookOpen,
    Hash,
    GraduationCap,
    Calendar,
    Award
} from "lucide-react";

export default function SubjectTable({

    subjects,

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
                                Subject
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Code
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Course
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Semester
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Credits
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

                            subjects.map((subject) => (

                                <tr
                                    key={subject.id}
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

                                                    {subject.subjectName}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    ID : {subject.id}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Hash size={16} />

                                            <span>

                                                {subject.subjectCode}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <GraduationCap size={16} />

                                            <span>

                                                {subject.courseName}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Calendar size={16} />

                                            <span>

                                                Semester {subject.semester}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Award size={16} />

                                            <span>

                                                {subject.credits}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {

                                            subject.enabled ?

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

                                                onClick={() => onEdit(subject)}

                                                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100"

                                            >

                                                <Pencil
                                                    size={18}
                                                    className="text-blue-600"
                                                />

                                            </button>

                                            <button

                                                onClick={() => onDelete(subject)}

                                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100"

                                            >

                                                <Trash2
                                                    size={18}
                                                    className="text-red-600"
                                                />

                                            </button>

                                            <button

                                                onClick={() => onToggleStatus(subject)}

                                                className={`p-2 rounded-lg ${

                                                    subject.enabled
                                                        ? "bg-yellow-50 hover:bg-yellow-100"
                                                        : "bg-green-50 hover:bg-green-100"

                                                }`}

                                            >

                                                {

                                                    subject.enabled ?

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