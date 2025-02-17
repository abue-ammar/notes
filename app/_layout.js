// app/_layout.js
import React from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { NotesProvider } from "../context/NotesContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Slot />
      </NotesProvider>
    </ThemeProvider>
  );
}
