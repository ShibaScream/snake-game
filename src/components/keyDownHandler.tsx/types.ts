import { ReactNode } from 'react';

export type Direction = 'left' | 'right' | 'down' | 'up';
export const DEFAULT_DIRECTION: Direction = 'right';
export const KEYDOWN_DIRECTION_MAPPING = new Map<string, Direction>([
  ['ArrowLeft', 'left'],
  ['ArrowRight', 'right'],
  ['ArrowDown', 'down'],
  ['ArrowUp', 'up']
]);

export interface IKeyDownHandler {
  children: (direction: Direction) => ReactNode;
}
