import React from 'react';
import './Node.css';

const Node = (props) => {
  const { row, col, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp } = props;
  const extraClassName = isEnd ? 'node-end' : isStart ? 'node-start' : isWall ? 'node-wall' : '';

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
