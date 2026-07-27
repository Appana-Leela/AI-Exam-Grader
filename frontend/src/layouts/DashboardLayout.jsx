import { useAuth } from "../context/AuthContext";

import TeacherSidebar from "../components/layout/TeacherSidebar";
import StudentSidebar from "../components/layout/StudentSidebar";
import TopNavbar from "../components/layout/TopNavbar";
export default function DashboardLayout({ children }) {

    const { user } = useAuth();

    return (

        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

            {

                user?.role === "STUDENT"

                    ?

                    <StudentSidebar />

                    :

                    <TeacherSidebar />

            }

            <div className="flex flex-col flex-1">

                <TopNavbar />

                <main className="flex-1 overflow-auto p-6">

                    {children}

                </main>

            </div>

        </div>

    );

}