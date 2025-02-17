// app/index.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NotesContext } from "../context/NotesContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { notes } = useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, theme === "dark" && styles.darkText]}>
          Notes
        </Text>
        <View style={styles.headerRight}>
          {/* <Text style={[styles.dateText, theme === "dark" && styles.darkText]}>
            31 Oct
          </Text> */}
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Notes List */}
      <ScrollView style={styles.notesList}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            style={[styles.card, theme === "dark" && styles.darkCard]}
            onPress={() =>
              router.push({
                pathname: "/(modal)/noteEditor",
                params: { id: note.id },
              })
            }
          >
            <Text
              style={[styles.cardTitle, theme === "dark" && styles.darkText]}
            >
              {note.title}
            </Text>
            <Text
              style={[styles.cardBody, theme === "dark" && styles.darkText]}
            >
              {note.body}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(modal)/noteEditor")}
      >
        <Ionicons name="add-outline" size={28} color="white" />
      </TouchableOpacity>
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
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "black" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 18, color: "gray" },
  settingsIcon: { fontSize: 24, color: "black" },
  notesList: { flex: 1 },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    // Use boxShadow for web (deprecated shadow* props removed)
    // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  darkCard: { backgroundColor: "#333", borderColor: "#555" },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "black",
  },
  cardBody: { fontSize: 14, color: "gray" },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "black",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabIcon: { color: "white", fontSize: 24 },
  darkText: { color: "white" },
});
