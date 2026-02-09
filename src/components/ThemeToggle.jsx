import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="hover-lift"
            style={{
                background: "rgba(255,255,255,0.1)", // Glassy effect
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: "var(--text-main)", // Will adapt via CSS variables
                transition: "all 0.3s ease"
            }}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;
