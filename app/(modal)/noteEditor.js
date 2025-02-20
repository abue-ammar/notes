import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { NotesContext } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";

export default function NoteEditor() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const { theme } = useTheme();

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

  const currentColors = Colors[theme];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>
          {noteToEdit ? "Edit Note" : "New Note"}
        </Text>
        {noteToEdit && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={currentColors.danger}
            />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={currentColors.placeholder}
        style={[
          styles.titleInput,
          {
            backgroundColor: currentColors.inputBackground,
            borderColor: currentColors.inputBorder,
            color: currentColors.text,
          },
        ]}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write your note..."
        placeholderTextColor={currentColors.placeholder}
        style={[
          styles.bodyInput,
          {
            backgroundColor: currentColors.inputBackground,
            borderColor: currentColors.inputBorder,
            color: currentColors.text,
          },
        ]}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.cancelButton,
            { backgroundColor: currentColors.buttonSecondary },
          ]}
        >
          <Text
            style={[styles.cancelButtonText, { color: currentColors.text }]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          style={[
            styles.saveButton,
            { backgroundColor: currentColors.buttonPrimary },
          ]}
        >
          <Text style={[styles.saveButtonText, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  titleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
  },
  bodyInput: {
    borderWidth: 1,
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: { fontSize: 16 },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: { fontSize: 16 },
});
