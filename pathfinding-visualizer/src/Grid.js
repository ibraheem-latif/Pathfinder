import React from 'react';

const Grid = () => {
  const numRows = 20;
  const numCols = 50;

  const createEmptyGrid = () => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
      grid.push(Array.from(Array(numCols), () => 0));
    }
    return grid;
  };

  const grid = createEmptyGrid();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
      {grid.map((row, i) =>
        row.map((col, j) => (
          <div
            key={`${i}-${j}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][j] ? 'black' : 'white',
              border: 'solid 1px black',
            }}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
