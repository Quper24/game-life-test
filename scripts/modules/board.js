import { CELL_COUNT, MIN_SIZE_CELL } from "./const.js";
import {
  getCanvas,
  getColsInput,
  getCtx,
  getGridCanvas,
  getOffCtx,
  getOffscreenCanvas,
  getRowsInput,
} from "./controlManage.js";
import { drawCell, drawGridOnGridCanvas } from "./draw.js";
import { getAliveNeighbors, precomputeNeighbors } from "./game.js";
import state from "./gameState.js";

export const createBoard = () => {
  if (state.running) return;
  const colsInput = getColsInput();
  const rowsInput = getRowsInput();
  const canvas = getCanvas();
  const ctx = getCtx();
  const offCtx = getOffCtx();
  const offscreenCanvas = getOffscreenCanvas();
  const cols = parseInt(colsInput.value) || CELL_COUNT;
  const rows = parseInt(rowsInput.value) || CELL_COUNT;
  precomputeNeighbors(cols, rows);
  const containerSize = canvas.width;
  const cellSize = containerSize / cols;
  state.cells = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  );
  state.setPreviousCells(state.cells.map((row) => [...row]));
  offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  state.cells.forEach((row, y) =>
    row.forEach((cell, x) => drawCell(x, y, cell, cellSize)),
  );
  ctx.drawImage(offscreenCanvas, 0, 0);
};

export const updateBoard = () => {
  const canvas = getCanvas();
  const offscreenCanvas = getOffscreenCanvas();
  const ctx = getCtx();
  const cols = state.cells[0].length;
  const rows = state.cells.length;
  const containerSize = canvas.width;
  const cellSize = containerSize / cols;

  state.setCells(
    state.cells.map((row, y) =>
      row.map((cell, x) => {
        const isAlive = cell;
        const neighbors = getAliveNeighbors(x, y);
        return isAlive && (neighbors < 2 || neighbors > 3)
          ? 0
          : !isAlive && neighbors === 3
          ? 1
          : isAlive;
      }),
    ),
  );

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (state.cells[y][x] !== state.previousCells[y][x]) {
        drawCell(x, y, state.cells[y][x], cellSize);
      }
    }
  }
  state.setPreviousCells(state.cells.map((row) => [...row]));
  ctx.drawImage(offscreenCanvas, 0, 0);
};

export const resizeCanvas = () => {
  const canvas = getCanvas();
  const offscreenCanvas = getOffscreenCanvas();
  const gridCanvas = getGridCanvas();
  const colsInput = getColsInput();
  const rowsInput = getRowsInput();
  const maxWidth = document.body.offsetWidth * 0.9;
  const maxHeight = window.innerHeight * 0.8;
  const cols = parseInt(colsInput.value) || CELL_COUNT;
  const rows = parseInt(rowsInput.value) || CELL_COUNT;
  let cellSize = Math.max(maxWidth / cols, MIN_SIZE_CELL);
  cellSize = Math.max(Math.min(cellSize, maxHeight / rows), MIN_SIZE_CELL);
  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  gridCanvas.width = canvas.width;
  gridCanvas.height = canvas.height;

  drawGridOnGridCanvas(cols, rows, cellSize);
  createBoard();
};

export const animate = () => {
  if (!state.running) return;
  updateBoard();
  requestAnimationFrame(animate);
};
