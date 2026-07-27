import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button

            onClick={toggleTheme}

            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition"

        >

            {

                theme === "light"

                    ?

                    <Moon size={18}/>

                    :

                    <Sun size={18}/>

            }

        </button>

    );

}