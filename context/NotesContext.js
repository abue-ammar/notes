// app/NotesContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  // Load notes from AsyncStorage when the component mounts
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Failed to load notes from storage:", error);
      }
    };

    loadNotes();
  }, []);

  // Save notes to AsyncStorage whenever they change
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to storage:", error);
      }
    };

    saveNotes();
  }, [notes]);

  const addNote = (title, body) => {
    const newNote = { id: Date.now().toString(), title, body };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (id, title, body) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { id, title, body } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
