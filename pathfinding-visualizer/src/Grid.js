import React, { useState, useEffect } from 'react';
import Node from './Node';
import { dijkstra } from './dijkstra';
import './Grid.css'

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // Handler functions
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // Dijkstra's algorithm
  const visualizeDijkstra = () => {
    const startNode = grid[10][5];
    const endNode = grid[10][45];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    animateDijkstra(visitedNodesInOrder);
  };

  // Animation functions
  const animateDijkstra = (visitedNodesInOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(visitedNodesInOrder[i]);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  };

  // Initial grid
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  return (
    <div className="grid">
      <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => {
            const { row, col, isStart, isEnd, isWall } = node;
            return (
              <Node
                key={`${row}-${col}`}
                row={row}
                col={col}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Helper functions
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === 10 && col === 5,
    isEnd: row === 10 && col === 45,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
