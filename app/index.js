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

export default function Home() {
  const { notes } = useContext(NotesContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
        <View style={styles.headerRight}>
          <Text style={styles.dateText}>31 Oct</Text>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notes List */}
      <ScrollView style={styles.notesList}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(modal)/noteEditor",
                params: { id: note.id },
              })
            }
          >
            <Text style={styles.cardTitle}>{note.title}</Text>
            <Text style={styles.cardBody}>{note.body}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(modal)/noteEditor")}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
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
  headerTitle: { fontSize: 32, fontWeight: "bold" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 18, color: "gray", marginRight: 8 },
  settingsIcon: { fontSize: 24 },
  notesList: { flex: 1 },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
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
});
