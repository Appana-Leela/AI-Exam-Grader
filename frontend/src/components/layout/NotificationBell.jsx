import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {

    const [open, setOpen] = useState(false);

    return (

        <div className="relative">

            <button

                onClick={() => setOpen(!open)}

                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"

            >

                <Bell size={20} />

                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>

            </button>

            {

                open &&

                <NotificationDropdown />

            }

        </div>

    );

}