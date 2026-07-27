import { CheckCircle, FileText, Bell } from "lucide-react";

const notifications = [

    {
        id: 1,
        title: "Exam Published",
        message: "Data Structures Mid-1 is now available.",
        icon: <FileText size={18} className="text-blue-600" />
    },

    {
        id: 2,
        title: "Evaluation Completed",
        message: "Your answer sheet has been evaluated.",
        icon: <CheckCircle size={18} className="text-green-600" />
    },

    {
        id: 3,
        title: "Reminder",
        message: "Upcoming examination tomorrow.",
        icon: <Bell size={18} className="text-orange-500" />
    }

];

export default function NotificationDropdown() {

    return (

        <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border dark:border-slate-700 z-50">

            <div className="p-4 border-b dark:border-slate-700">

                <h2 className="font-bold text-lg">

                    Notifications

                </h2>

            </div>

            <div className="max-h-80 overflow-y-auto">

                {

                    notifications.map(item => (

                        <div

                            key={item.id}

                            className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"

                        >

                            {item.icon}

                            <div>

                                <h3 className="font-semibold">

                                    {item.title}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    {item.message}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}