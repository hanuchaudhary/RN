import { View, StyleSheet } from "react-native";
import { Coordinates } from "@/types/types";
import { COLORS } from "@/styles/styles";

interface SnakeProps {
  snake: Coordinates[];
  cellSize: number;
}

export default function Snake({ snake, cellSize }: SnakeProps) {
  return (
    <>
      {snake.map((segment, index) => (
        <View
          key={`${segment.x}-${segment.y}-${index}`}
          style={[
            styles.segment,
            {
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              width: cellSize - 1,
              height: cellSize - 1,
              borderRadius: index === 0 ? cellSize / 3 : cellSize / 6,
            },
          ]}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  segment: {
    position: "absolute",
    backgroundColor: COLORS.tertiary,
  },
});
