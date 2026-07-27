import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    FileText,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

export default function Sidebar() {

    const location = useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard
        },

        {
            name: "Teachers",
            path: "/admin/teachers",
            icon: Users
        },

        {
            name: "Students",
            path: "/admin/students",
            icon: GraduationCap
        },

        {
            name: "Courses",
            path: "/admin/courses",
            icon: BookOpen
        },

        {
            name: "Subjects",
            path: "/admin/subjects",
            icon: ClipboardList
        },

        {
            name: "Exams",
            path: "/admin/exams",
            icon: FileText
        },

        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: BarChart3
        },

        {
            name: "Settings",
            path: "/admin/settings",
            icon: Settings
        }

    ];

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white">

            <div className="text-2xl font-bold p-6 border-b border-slate-700">

                AI Exam

            </div>

            <nav className="mt-4">

                {

                    menuItems.map((item) => {

                        const Icon = item.icon;

                        const active = location.pathname === item.path;

                        return (

                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3 transition
                                    ${
                                        active
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-700"
                                    }`}
                            >

                                <Icon size={18} />

                                {item.name}

                            </Link>

                        );

                    })

                }

            </nav>

            <div className="absolute bottom-0 w-64 border-t border-slate-700">

                <Link
                    to="/login"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-red-600 transition"
                >

                    <LogOut size={18} />

                    Logout

                </Link>

            </div>

        </aside>

    );

}