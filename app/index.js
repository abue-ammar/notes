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
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constants/Colors";
import { NotesContext } from "../context/NotesContext";
import { useTheme } from "../context/ThemeContext";
export default function Home() {
  const { notes } = useContext(NotesContext);
  const { theme } = useTheme();
  const router = useRouter();
  const currentColors = Colors[theme];
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>
          Notes
        </Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={currentColors.text}
          />
        </TouchableOpacity>
      </View>
      {/* Notes List */}
      <ScrollView style={styles.notesList}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            style={[
              styles.card,
              {
                backgroundColor: currentColors.cardBackground,
                borderColor: currentColors.cardBorder,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/(modal)/noteEditor",
                params: { id: note.id },
              })
            }
          >
            <Text style={[styles.cardTitle, { color: currentColors.text }]}>
              {note.title}
            </Text>
            <Text style={[styles.cardBody, { color: currentColors.text }]}>
              {note.body}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: currentColors.fabBackground }]}
        onPress={() => router.push("/(modal)/noteEditor")}
      >
        <Ionicons name="add-outline" size={28} color="white" />
      </TouchableOpacity>
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
  headerTitle: { fontSize: 32, fontWeight: "bold" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 18 },
  settingsIcon: { fontSize: 24 },
  notesList: { flex: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardBody: { fontSize: 14 },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,

    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabIcon: { fontSize: 24 },
});
