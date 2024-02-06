import { getCanvas, getGridCanvas } from "./controlManage.js";
import state from "./gameState.js";

export const precomputeNeighbors = (cols, rows) => {
  state.neighborsMap = new Array(rows);
  for (let y = 0; y < rows; y++) {
    state.neighborsMap[y] = new Array(cols);
    for (let x = 0; x < cols; x++) {
      const neighbors = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + cols) % cols;
          const ny = (y + dy + rows) % rows;
          neighbors.push([ny, nx]);
        }
      }
      state.neighborsMap[y][x] = neighbors;
    }
  }
};

export const getAliveNeighbors = (x, y) => {
  return state.neighborsMap[y][x].reduce(
    (acc, [ny, nx]) => acc + (state.cells[ny][nx] ? 1 : 0),
    0,
  );
};

export const setupGridCanvas = () => {
  const gridCanvas = getGridCanvas();
  const canvas = getCanvas();
  gridCanvas.width = canvas.width;
  gridCanvas.height = canvas.height;
  gridCanvas.style.position = "absolute";
  gridCanvas.style.pointerEvents = "none";
  canvas.before(gridCanvas);
};
