import { View, StyleSheet, Pressable, Text } from "react-native";
import { COLORS } from "@/styles/styles";

interface HeaderProps {
  score: number;
  isPaused: boolean;
  onPause: () => void;
  onReset: () => void;
}

export default function Header({ score, isPaused, onPause, onReset }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPause}>
        <Text style={styles.buttonText}>{isPaused ? "Play" : "Pause"}</Text>
      </Pressable>
      <Text style={styles.score}>Score: {score}</Text>
      <Pressable style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.quaternary,
    fontSize: 14,
    fontWeight: "600",
  },
  score: {
    color: COLORS.tertiary,
    fontSize: 18,
    fontWeight: "700",
  },
});
