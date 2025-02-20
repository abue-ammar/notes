import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NotesProvider } from "../context/NotesContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <AppStatusBar />
        <Slot />
      </NotesProvider>
    </ThemeProvider>
  );
}

function AppStatusBar() {
  const { theme } = useTheme();
  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
}
