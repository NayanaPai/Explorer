import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default to light as per user request, or check local storage
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("app-theme");
        return saved || "light"; // Defaulting to light as requested
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("light-theme");
        } else {
            root.classList.remove("light-theme");
        }
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
