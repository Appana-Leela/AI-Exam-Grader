import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {

        return localStorage.getItem("theme") || "light";

    });

    useEffect(() => {

        const root = document.documentElement;

        root.classList.remove("light", "dark");

        root.classList.add(theme);

        localStorage.setItem("theme", theme);

    }, [theme]);

    function toggleTheme() {

        setTheme(prev => prev === "light" ? "dark" : "light");

    }

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                setTheme
            }}
        >
            {children}
        </ThemeContext.Provider>

    );

}

export function useTheme() {

    return useContext(ThemeContext);

}