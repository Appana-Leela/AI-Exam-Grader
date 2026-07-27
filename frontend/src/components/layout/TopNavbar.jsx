import { useAuth } from "../../context/AuthContext";

import SearchBar from "../common/SearchBar";
import ThemeToggle from "../common/ThemeToggle";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export default function TopNavbar() {

    const { user } = useAuth();

    const firstName =

        user?.firstName ||

        localStorage.getItem("firstName") ||

        "User";

    const role =

        user?.role ||

        "";

    return (

        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm px-6 flex items-center justify-between transition-colors duration-300">

            <div>

                <h2 className="text-2xl font-bold">

                    AI Exam Grader

                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                    Welcome back,

                    <span className="font-semibold ml-1">

                        {firstName}

                    </span>

                    {

                        role &&

                        <span className="ml-2 text-blue-600">

                            ({role})

                        </span>

                    }

                </p>

            </div>

            <div className="flex items-center gap-5">

                <SearchBar />

                <NotificationBell />

                <ThemeToggle />

                <UserMenu />

            </div>

        </header>

    );

}