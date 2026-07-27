import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CircleHelp,
  Users,
  BarChart3,
  Brain,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/teacher/dashboard",
  },
  {
    title: "Exams",
    icon: FileText,
    path: "/teacher/exams",
  },
  {
    title: "Questions",
    icon: CircleHelp,
    path: "/teacher/questions",
  },
  {
    title: "Students",
    icon: Users,
    path: "/teacher/students",
  },
  {
    title: "Student Exams",
    icon: FileText,
    path: "/student/exams"
  },

  {
    title: "Available Exams",
    icon: FileText,
    path: "/student/exams"
  },
  {
    title: "Results",
    icon: BarChart3,
    path: "/teacher/results",
  },
  {
    title: "AI Evaluation",
    icon: Brain,
    path: "/teacher/ai-evaluation",
  },


];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">AI Exam</h1>
        <p className="text-sm text-slate-400">
          Teacher Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}