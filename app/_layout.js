import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotesProvider } from "../context/NotesContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <AppStatusBar />
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </NotesProvider>
    </ThemeProvider>
  );
}

function AppStatusBar() {
  const { theme } = useTheme();
  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
}
