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

export default function NoteEditor() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);

  // Find the note to edit (if any)
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {noteToEdit ? "Edit Note" : "New Note"}
        </Text>
        {noteToEdit && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.titleInput}
      />

      {/* Body Input */}
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write your note..."
        style={styles.bodyInput}
        multiline
      />

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  deleteIcon: { fontSize: 24, color: "red" },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex: 1,
    textAlignVertical: "top",
  },
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
  cancelButtonText: { fontSize: 16 },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: { fontSize: 16, color: "white" },
});
