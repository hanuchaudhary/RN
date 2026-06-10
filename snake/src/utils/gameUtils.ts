import { Coordinates, Direction } from "@/types/types";

export const GRID_SIZE = 30;
export const GAME_SPEED = 150;
export const SWIPE_THRESHOLD = 30;

export const INITIAL_SNAKE_POSITION: Coordinates = { x: 5, y: 5 };
export const INITIAL_SNAKE_DIRECTION = Direction.RIGHT;
export const INITIAL_FOOD_POSITION: Coordinates = { x: 10, y: 10 };

export function getNextHead(head: Coordinates, direction: Direction): Coordinates {
  switch (direction) {
    case Direction.UP:
      return { x: head.x, y: head.y - 1 };
    case Direction.DOWN:
      return { x: head.x, y: head.y + 1 };
    case Direction.LEFT:
      return { x: head.x - 1, y: head.y };
    case Direction.RIGHT:
      return { x: head.x + 1, y: head.y };
  }
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return (
    (current === Direction.UP && next === Direction.DOWN) ||
    (current === Direction.DOWN && next === Direction.UP) ||
    (current === Direction.LEFT && next === Direction.RIGHT) ||
    (current === Direction.RIGHT && next === Direction.LEFT)
  );
}

export function checkWallCollision(head: Coordinates, gridSize: number): boolean {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
}

export function checkSelfCollision(head: Coordinates, snake: Coordinates[]): boolean {
  return snake.slice(0, -1).some((segment) => segment.x === head.x && segment.y === head.y);
}

export function getRandomFoodPosition(snake: Coordinates[], gridSize: number): Coordinates {
  let position: Coordinates;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snake.some((segment) => segment.x === position.x && segment.y === position.y));
  return position;
}
