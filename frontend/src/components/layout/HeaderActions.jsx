import { Bell } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../context/AuthContext";

export default function HeaderActions() {

    const { user } = useAuth();

    return (

        <div className="flex items-center gap-5">

            <button className="relative">

                <Bell size={21} />

                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

            </button>

            <ThemeToggle />

            <ProfileDropdown

                user={user}

            />

        </div>

    );

}