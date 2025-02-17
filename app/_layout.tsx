import { Slot } from "expo-router";
import React from "react";
import { NotesProvider } from "../context/NotesContext";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Slot />
    </NotesProvider>
  );
}
