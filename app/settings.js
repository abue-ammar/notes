// app/settings.js
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <Text style={[styles.title, theme === "dark" && styles.darkTitle]}>
        Settings
      </Text>
      <View style={styles.settingItem}>
        <Text
          style={[
            styles.settingText,
            theme === "dark" && styles.darkSettingText,
          ]}
        >
          Dark Mode
        </Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  darkContainer: { backgroundColor: "#222" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "black" },
  darkTitle: { color: "white" },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  settingText: { fontSize: 18, color: "black" },
  darkSettingText: { color: "white" },
});
