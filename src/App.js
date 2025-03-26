import React, { useState } from 'react';
import './App.css';

const MatrixGame = () => {
  const gridSize = 3;
  const initialMatrix = Array(gridSize).fill(null).map(() => Array(gridSize).fill('white'));

  const [matrix, setMatrix] = useState(initialMatrix);
  const [clicks, setClicks] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] !== 'white') return;

    const newMatrix = matrix.map((r, i) => r.map((c, j) => (i === row && j === col ? 'green' : c)));
    setMatrix(newMatrix);
    setClicks([...clicks, { row, col }]);

    if (clicks.length + 1 === gridSize * gridSize) {
      handleLastClick([...clicks, { row, col }]);
    }
  };

  const handleLastClick = (updatedClicks) => {
    updatedClicks.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setMatrix(prevMatrix => prevMatrix.map((r, i) => r.map((c, j) => (i === row && j === col ? 'orange' : c))));
      }, 500 * index);
    });
  };

  const handleReset = () => {
    setMatrix(initialMatrix);
    setClicks([]);
  };

  return (
    <div className="container">
      <h1>Matrix Click Game</h1>
      <div className="grid">
        {matrix.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
      <button className="button" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default MatrixGame;
