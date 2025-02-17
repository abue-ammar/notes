// app/(modal)/noteEditor.js
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NotesContext } from "../../context/NotesContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function NoteEditor() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);

  const noteToEdit = notes.find((note) => note.id === id);

  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : "");
  const [body, setBody] = useState(noteToEdit ? noteToEdit.body : "");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setBody(noteToEdit.body);
    }
  }, [noteToEdit]);

  const onSave = () => {
    if (noteToEdit) {
      updateNote(noteToEdit.id, title, body);
    } else {
      addNote(title, body);
    }
    router.back();
  };

  const onDelete = () => {
    if (noteToEdit) {
      deleteNote(noteToEdit.id);
    }
    router.back();
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, theme === "dark" && styles.darkText]}>
          {noteToEdit ? "Edit Note" : "New Note"}
        </Text>
        {noteToEdit && (
          <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
        style={[styles.titleInput, theme === "dark" && styles.darkInput]}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write your note..."
        placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
        style={[styles.bodyInput, theme === "dark" && styles.darkInput]}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.cancelButton, theme === "dark" && styles.darkButton]}
        >
          <Text
            style={[
              styles.cancelButtonText,
              theme === "dark" && styles.darkButtonText,
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          style={[styles.saveButton, theme === "dark" && styles.darkButton]}
        >
          <Text
            style={[
              styles.saveButtonText,
              theme === "dark" && styles.darkButtonText,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  darkContainer: { backgroundColor: "#222" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "black" },
  deleteIcon: { fontSize: 24, color: "red" },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
    color: "black",
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex: 1,
    textAlignVertical: "top",
    color: "black",
  },
  darkInput: { backgroundColor: "#333", color: "white", borderColor: "#555" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: { fontSize: 16, color: "black" },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: { fontSize: 16, color: "white" },
  darkText: { color: "white" },
  darkButton: { backgroundColor: "#444" },
  darkButtonText: { color: "white" },
});
