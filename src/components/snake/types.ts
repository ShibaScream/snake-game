import { ReactNode } from 'react';
import { Direction } from '../keyDownHandler.tsx/types';

export type SnakeMap = [string, number][];
export type SnakeHead = [number, number];

export interface ISnakeState {
  snake: Map<string, number>;
  head: SnakeHead;
}

export interface ISnakeProps {
  direction: Direction;
  children: (
    snake: Map<string, number>,
    head: SnakeHead,
    moveSnake: (hasSnack: boolean) => boolean
  ) => ReactNode;
}
