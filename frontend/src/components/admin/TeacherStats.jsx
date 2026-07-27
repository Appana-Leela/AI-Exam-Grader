import {
    Users,
    UserCheck,
    UserX,
    Building2
} from "lucide-react";

export default function TeacherStats({ teachers }) {

    const totalTeachers = teachers.length;

    const activeTeachers = teachers.filter(
        (teacher) => teacher.enabled
    ).length;

    const inactiveTeachers = totalTeachers - activeTeachers;

    const departments = new Set(
        teachers.map((teacher) => teacher.department)
    ).size;

    const stats = [

        {
            title: "Total Teachers",
            value: totalTeachers,
            icon: <Users size={28} />,
            bg: "bg-blue-100",
            color: "text-blue-700"
        },

        {
            title: "Active",
            value: activeTeachers,
            icon: <UserCheck size={28} />,
            bg: "bg-green-100",
            color: "text-green-700"
        },

        {
            title: "Disabled",
            value: inactiveTeachers,
            icon: <UserX size={28} />,
            bg: "bg-red-100",
            color: "text-red-700"
        },

        {
            title: "Departments",
            value: departments,
            icon: <Building2 size={28} />,
            bg: "bg-yellow-100",
            color: "text-yellow-700"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                stats.map((card, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-xl shadow border p-6 flex justify-between items-center hover:shadow-lg transition"
                    >

                        <div>

                            <p className="text-gray-500 text-sm">

                                {card.title}

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {card.value}

                            </h2>

                        </div>

                        <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center ${card.bg} ${card.color}`}
                        >

                            {card.icon}

                        </div>

                    </div>

                ))

            }

        </div>

    );

}