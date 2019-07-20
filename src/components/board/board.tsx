import React, { useState, useEffect } from 'react';

type Direction = 'left' | 'right' | 'down' | 'up';

const BOARD_SIZE = 16;
const DEFAULT_SNAKE: [string, number][] = [['0,0', 1], ['0,1', 1], ['0,2', 1]];
const DEFAULT_DIRECTION: Direction = 'right';

export const Board: React.FC = () => {
  const [board] = useState(
    new Array(BOARD_SIZE)
      .fill(null)
      .map(array => new Array(BOARD_SIZE).fill(null))
  );
  const [snake, setSnake] = useState(new Map(DEFAULT_SNAKE));
  const headStr = Array.from(snake.keys()).pop() as string;
  const [head, setHead] = useState(headStr.split(',').map(str => +str));
  const [direction] = useState(DEFAULT_DIRECTION as Direction);

  const tick = () => {
    console.log('called the tick!');
    const newHead = head;
    switch (direction) {
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
    console.log(newHead);
    setHead(newHead);
    snake.set(`${newHead[0]},${newHead[1]}`, 1);
    setSnake(snake);
    snake.delete(snake.keys().next().value);
    setSnake(snake);
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      {board.map((row, i) => (
        <div key={`row` + i} className='row'>
          {row.map((column, j) => {
            const value = snake.has(`${i},${j}`) ? 'x' : '';

            return (
              <div key={`column` + j} className='column'>
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
