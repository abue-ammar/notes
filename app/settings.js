import React, { useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const currentColors = Colors[theme];
  const opacity = useSharedValue(0); // Start with opacity 0 (invisible)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 1000 }), // Smooth fade-in effect
    };
  });

  useEffect(() => {
    opacity.value = 1;
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: currentColors.background },
        animatedStyle,
      ]}
    >
      <Text style={[styles.title, { color: currentColors.text }]}>
        Settings
      </Text>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: currentColors.text }]}>
          Dark Mode
        </Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  settingText: { fontSize: 18 },
});
