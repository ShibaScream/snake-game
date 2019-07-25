import React from 'react';
import { ISnakeProps, ISnakeState, SnakeHead, SnakeMap } from './types';

const DEFAULT_SNAKE_LENGTH = 5;
const { DEFAULT_SNAKE, DEFAULT_HEAD } = createDefaultSnakeShape();

function createDefaultSnakeShape() {
  let snake: SnakeMap = [];
  let head!: SnakeHead;
  for (let i = 0; i < DEFAULT_SNAKE_LENGTH; i++) {
    head = [0, i];
    snake.push([JSON.stringify(head), 1]);
  }
  return { DEFAULT_SNAKE: snake, DEFAULT_HEAD: head };
}

export default class Snake extends React.Component<ISnakeProps, ISnakeState> {
  state = {
    snake: new Map(DEFAULT_SNAKE),
    head: DEFAULT_HEAD
  };

  moveSnake = (hasSnack: boolean) => {
    const newHead = this.state.head;
    switch (this.props.direction) {
      case 'right':
        newHead[1] = newHead[1] + 1;
        break;
      case 'left':
        newHead[1] = newHead[1] - 1;
        break;
      case 'down':
        newHead[0] = newHead[0] + 1;
        break;
      case 'up':
        newHead[0] = newHead[0] - 1;
        break;
    }

    if (this.state.snake.has(JSON.stringify(newHead))) {
      return false;
    }

    this.setState((prevState: ISnakeState) => {
      prevState.snake.set(JSON.stringify(newHead), 1);
      if (!hasSnack) {
        prevState.snake.delete(prevState.snake.keys().next().value);
      }
      return {
        head: newHead,
        snake: prevState.snake
      };
    });
    return true;
  };

  render() {
    return this.props.children(
      this.state.snake,
      this.state.head,
      this.moveSnake
    );
  }
}
