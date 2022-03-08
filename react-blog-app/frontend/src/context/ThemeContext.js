import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ThemeContext = createContext();

//localStorage
const isDefaultLocale = localStorage.getItem("Theme Mode");

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(isDefaultLocale);

    const values = {
        theme,
        setTheme
    }

    useEffect(() => {
        localStorage.setItem("Theme Mode", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);