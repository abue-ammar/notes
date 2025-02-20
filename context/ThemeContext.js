import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Detect system theme
  const [theme, setTheme] = useState(systemColorScheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      setTheme(storedTheme || systemColorScheme);
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
