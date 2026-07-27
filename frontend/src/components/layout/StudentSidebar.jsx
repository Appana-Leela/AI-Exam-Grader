import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    ClipboardCheck,
    BarChart3,
    LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
    {
        title: "Dashboard",
        path: "/student/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Available Exams",
        path: "/student/exams",
        icon: FileText
    },
    {
        title: "My Attempts",
        path: "/student/attempts",
        icon: ClipboardCheck
    },
    {
        title: "Results",
        path: "/student/results",
        icon: BarChart3
    }
];

export default function StudentSidebar() {

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        window.location.href = "/login";

    }

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">

                    AI Exam Grader

                </h1>

                <p className="text-slate-400 text-sm mt-1">

                    Student Portal

                </p>

            </div>

            <nav className="flex-1 p-4 space-y-2">

                {

                    menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.title}

                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-slate-800"
                                    }`

                                }

                            >

                                <Icon size={20} />

                                <span>

                                    {item.title}

                                </span>

                            </NavLink>

                        );

                    })

                }

            </nav>

            <div className="border-t border-slate-700 p-4">

                <button

                    onClick={handleLogout}

                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

}