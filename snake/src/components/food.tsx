import { View, StyleSheet } from "react-native";
import { Coordinates } from "@/types/types";
import { COLORS } from "@/styles/styles";

interface FoodProps {
  food: Coordinates;
  cellSize: number;
}

export default function Food({ food, cellSize }: FoodProps) {
  return (
    <View
      style={[
        styles.food,
        {
          left: food.x * cellSize,
          top: food.y * cellSize,
          width: cellSize - 1,
          height: cellSize - 1,
          borderRadius: cellSize / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  food: {
    position: "absolute",
    backgroundColor: COLORS.quinary,
  },
});
