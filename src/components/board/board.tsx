import React from 'react';
import { IBoard, IBoardState } from './types';

const BOARD_SIZE = 32;

export class Board extends React.Component<IBoard, IBoardState> {
  private snakeMovement!: NodeJS.Timeout;
  private board = new Array(BOARD_SIZE)
    .fill(null)
    .map(array => new Array(BOARD_SIZE).fill(null));

  state = {
    isWin: false,
    isLoss: false,
    snackLocation: null
  };

  isValidMove(hasMoved: boolean) {
    if (hasMoved && this.isInBounds(this.props.head)) {
      return true;
    }
    return false;
  }

  isInBounds(head: [number, number]) {
    return (
      head[0] >= 0 &&
      head[0] < BOARD_SIZE &&
      head[1] >= 0 &&
      head[1] < BOARD_SIZE
    );
  }

  hasEatenSnack() {
    return false;
  }

  makeMove() {
    if (!this.isValidMove(this.props.moveSnake(this.hasEatenSnack()))) {
      this.setState(() => ({ isLoss: true }));
    }
  }

  componentDidMount() {
    this.snakeMovement = setInterval(() => this.makeMove(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.snakeMovement);
  }

  render() {
    return (
      <div>
        {this.state.isLoss ? (
          <div>YOU LOSE</div>
        ) : (
          this.board.map((row, i) => (
            <div key={`row` + i} className='row'>
              {row.map((column, j) => {
                const isSnake = this.props.snake.has(JSON.stringify([i, j]));

                return (
                  <div
                    key={`column` + j}
                    className={'column ' + (isSnake ? 'snake' : '')}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>
    );
  }
}
