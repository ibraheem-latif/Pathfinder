import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, row, col, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
  let extraClassName = '';

  if (isEnd) {
    extraClassName = 'node-end';
  } else if (isStart) {
    extraClassName = 'node-start';
  } else if (isWall) {
    extraClassName = 'node-wall';
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
