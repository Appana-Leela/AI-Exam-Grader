import {
    Pencil,
    Trash2,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Building2,
    GraduationCap,
    Hash
} from "lucide-react";

export default function StudentTable({

    students,

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
                                Student
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Contact
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Academic
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Department
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

                            students.map((student) => (

                                <tr
                                    key={student.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4">

                                        <div>

                                            <p className="font-semibold">

                                                {student.firstName} {student.lastName}

                                            </p>

                                            <p className="text-sm text-gray-500">

                                                ID : {student.id}

                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2">

                                                <Mail size={15} />

                                                <span>{student.email}</span>

                                            </div>

                                            <div className="flex items-center gap-2">

                                                <Phone size={15} />

                                                <span>{student.phone}</span>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2">

                                                <Hash size={15} />

                                                <span>

                                                    {student.rollNumber}

                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2">

                                                <GraduationCap size={15} />

                                                <span>

                                                    {student.year} Year

                                                </span>

                                            </div>

                                            <div>

                                                Section : {student.section}

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <Building2 size={16} />

                                            {student.department}

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        {

                                            student.enabled ?

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
                                                onClick={() => onEdit(student)}
                                                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100"
                                            >

                                                <Pencil
                                                    size={18}
                                                    className="text-blue-600"
                                                />

                                            </button>

                                            <button
                                                onClick={() => onDelete(student)}
                                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
                                            >

                                                <Trash2
                                                    size={18}
                                                    className="text-red-600"
                                                />

                                            </button>

                                            <button
                                                onClick={() => onToggleStatus(student)}
                                                className={`p-2 rounded-lg ${
                                                    student.enabled
                                                        ? "bg-yellow-50 hover:bg-yellow-100"
                                                        : "bg-green-50 hover:bg-green-100"
                                                }`}
                                            >

                                                {

                                                    student.enabled ?

                                                        <UserX
                                                            size={18}
                                                            className="text-yellow-700"
                                                        />

                                                        :

                                                        <UserCheck
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