import React from 'react';
import {
  DEFAULT_DIRECTION,
  Direction,
  IKeyDownHandler,
  KEYDOWN_DIRECTION_MAPPING
} from './types';

export default class KeyDownHandler extends React.Component<IKeyDownHandler> {
  private keydownEventListener: any;

  state = {
    direction: DEFAULT_DIRECTION
  };

  isValidDirection = (currentDirection: Direction, newDirection: Direction) => {
    if (currentDirection === 'left' || currentDirection === 'right') {
      return newDirection === 'up' || newDirection === 'down';
    } else {
      return newDirection === 'left' || newDirection === 'right';
    }
  };

  componentDidMount() {
    this.keydownEventListener = window.addEventListener('keydown', event => {
      if (
        KEYDOWN_DIRECTION_MAPPING.has(event.code) &&
        this.isValidDirection(
          this.state.direction,
          KEYDOWN_DIRECTION_MAPPING.get(event.code) as Direction
        )
      ) {
        this.setState(() => ({
          direction: KEYDOWN_DIRECTION_MAPPING.get(event.code)
        }));
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownEventListener);
  }

  render() {
    return this.props.children(this.state.direction);
  }
}
