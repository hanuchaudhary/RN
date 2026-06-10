import { COLORS } from "@/styles/styles";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";
import Snake from "./snake";
import Food from "./food";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Direction } from "@/types/types";
import React from "react";
import {
    GRID_SIZE,
    GAME_SPEED,
    SWIPE_THRESHOLD,
    INITIAL_SNAKE_POSITION,
    INITIAL_SNAKE_DIRECTION,
    INITIAL_FOOD_POSITION,
    getNextHead,
    isOppositeDirection,
    checkWallCollision,
    checkSelfCollision,
    getRandomFoodPosition,
} from "@/utils/gameUtils";

const INITIAL_SNAKE = [INITIAL_SNAKE_POSITION];

export default function Game() {
    const [snake, setSnake] = React.useState(INITIAL_SNAKE);
    const [direction, setDirection] = React.useState<Direction>(INITIAL_SNAKE_DIRECTION);
    const [food, setFood] = React.useState(INITIAL_FOOD_POSITION);
    const [score, setScore] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [boardSize, setBoardSize] = React.useState(0);

    const directionRef = React.useRef(direction);
    const foodRef = React.useRef(food);

    directionRef.current = direction;
    foodRef.current = food;

    const cellSize = boardSize / GRID_SIZE;

    const handleDirectionChange = React.useCallback((newDirection: Direction) => {
        setDirection((current) => {
            if (isOppositeDirection(current, newDirection)) return current;
            return newDirection;
        });
    }, []);

    const handleReset = React.useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_SNAKE_DIRECTION);
        setFood(INITIAL_FOOD_POSITION);
        setScore(0);
        setIsPaused(false);
        setIsGameOver(false);
    }, []);

    const handlePause = React.useCallback(() => {
        if (isGameOver) return;
        setIsPaused((prev) => !prev);
    }, [isGameOver]);

    React.useEffect(() => {
        if (isPaused || isGameOver) return;

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = getNextHead(prevSnake[0], directionRef.current);

                if (checkWallCollision(newHead, GRID_SIZE) || checkSelfCollision(newHead, prevSnake)) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                const currentFood = foodRef.current;
                const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y;

                if (ateFood) {
                    setScore((s) => s + 1);
                    setFood(getRandomFoodPosition([newHead, ...prevSnake], GRID_SIZE));
                    return [newHead, ...prevSnake];
                }

                return [newHead, ...prevSnake.slice(0, -1)];
            });
        }, GAME_SPEED);

        return () => clearInterval(interval);
    }, [isPaused, isGameOver]);

    const panGesture = Gesture.Pan().onEnd((event) => {
        const { translationX, translationY } = event;
        if (Math.abs(translationX) < SWIPE_THRESHOLD && Math.abs(translationY) < SWIPE_THRESHOLD) return;

        if (Math.abs(translationX) > Math.abs(translationY)) {
            runOnJS(handleDirectionChange)(translationX < 0 ? Direction.LEFT : Direction.RIGHT);
        } else {
            runOnJS(handleDirectionChange)(translationY < 0 ? Direction.UP : Direction.DOWN);
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header
                score={score}
                isPaused={isPaused}
                onPause={handlePause}
                onReset={handleReset}
            />
            <GestureDetector gesture={panGesture}>
                <View
                    style={styles.gameContainer}
                    onLayout={(e) => setBoardSize(e.nativeEvent.layout.width)}
                >
                    {cellSize > 0 && (
                        <>
                            <Snake snake={snake} cellSize={cellSize} />
                            <Food food={food} cellSize={cellSize} />
                        </>
                    )}
                    {isGameOver && (
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>Game Over</Text>
                            <Text style={styles.overlaySubtext}>Score: {score}</Text>
                        </View>
                    )}
                </View>
            </GestureDetector>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10,
        backgroundColor: COLORS.primary,
    },
    gameContainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderRadius: 16,
        overflow: "hidden",
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    overlayText: {
        color: COLORS.quaternary,
        fontSize: 32,
        fontWeight: "700",
    },
    overlaySubtext: {
        color: COLORS.quaternary,
        fontSize: 18,
        fontWeight: "500",
    },
});
