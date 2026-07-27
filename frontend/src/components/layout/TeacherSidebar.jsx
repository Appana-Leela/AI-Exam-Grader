import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    LogOut
} from "lucide-react";

const menuItems = [

    {
        title: "Dashboard",
        path: "/teacher/dashboard",
        icon: LayoutDashboard
    },

    {
        title: "Exams",
        path: "/teacher/exams",
        icon: FileText
    }

];

export default function TeacherSidebar() {

    const logout = () => {

        localStorage.clear();

        window.location.replace("/login");

    };

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-lg">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">

                    AI Exam Grader

                </h1>

                <p className="text-sm text-slate-400 mt-1">

                    Teacher Portal

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

                                    `

                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-xl
                                    transition-all
                                    duration-200

                                    ${

                                        isActive

                                            ? "bg-blue-600 text-white shadow"

                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"

                                    }

                                    `

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

            <div className="p-4 border-t border-slate-700">

                <button

                    onClick={logout}

                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

}