import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const firstName =
        localStorage.getItem("firstName") || "User";

    const role =
        user?.role ||
        localStorage.getItem("role") ||
        "";

    const handleLogout = () => {

        logout();

        navigate("/login", {
            replace: true
        });

    };

    return (

        <div className="flex items-center gap-4">

            <div className="text-right">

                <p className="font-semibold text-slate-700">

                    {firstName}

                </p>

                <p className="text-xs text-slate-500">

                    {role}

                </p>

            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">

                <User size={18} />

            </div>

            <button

                onClick={handleLogout}

                className="text-red-600 hover:text-red-700 transition"

                title="Logout"

            >

                <LogOut size={20} />

            </button>

        </div>

    );

}