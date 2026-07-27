import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserAvatar from "./UserAvatar";

export default function ProfileDropdown({

    user

}) {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <div className="flex items-center gap-3">

            <UserAvatar

                name={

                    user?.firstName || "User"

                }

            />

            <div>

                <h3 className="font-semibold">

                    {user?.firstName}

                </h3>

                <p className="text-sm text-gray-500">

                    {user?.role}

                </p>

            </div>

            <button

                onClick={handleLogout}

                className="hover:text-red-600"

            >

                <LogOut size={20}/>

            </button>

        </div>

    );

}