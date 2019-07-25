import React from 'react';
import './App.css';
import { Board } from './components/board/board';
import Snake from './components/snake/snake';
import KeyDownHandler from './components/keyDownHandler.tsx/keyDownHandler';

const App: React.ComponentType<{}> = () => {
  return (
    <div className='App'>
      <KeyDownHandler>
        {direction => (
          <Snake direction={direction}>
            {(snake, head, moveSnake) => (
              <Board snake={snake} head={head} moveSnake={moveSnake} />
            )}
          </Snake>
        )}
      </KeyDownHandler>
    </div>
  );
};

export default App;
