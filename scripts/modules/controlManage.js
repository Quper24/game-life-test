import { animate, resizeCanvas, updateBoard } from "./board.js";
import { drawCell } from "./draw.js";
import state from "./gameState.js";
import { debounce } from "./helpers.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startGame");
const stopButton = document.getElementById("stopGame");
const randomizeButton = document.getElementById("randomize");
const colsInput = document.getElementById("cols");
const rowsInput = document.getElementById("rows");

const offscreenCanvas = document.createElement("canvas");
const offCtx = offscreenCanvas.getContext("2d");
const gridCanvas = document.createElement("canvas");
const gridCtx = gridCanvas.getContext("2d");

export const getCanvas = () => canvas;
export const getCtx = () => ctx;
export const getStartButton = () => startButton;
export const getStopButton = () => stopButton;
export const getRandomizeButton = () => randomizeButton;
export const getColsInput = () => colsInput;
export const getRowsInput = () => rowsInput;
export const getOffscreenCanvas = () => offscreenCanvas;
export const getOffCtx = () => offCtx;
export const getGridCanvas = () => gridCanvas;
export const getGridCtx = () => gridCtx;

export const handleStartClick = () => {
  if (state.running) return;
  state.running = true;
  animate();
};

export const handleStopClick = () => {
  state.running = false;
};

export const handleRandomizeClick = () => {
  if (state.running) return;
  state.cells.forEach((row, y) =>
    row.forEach((cell, x) => (state.cells[y][x] = Math.random() > 0.5 ? 1 : 0)),
  );
  updateBoard();
};

export const handleCanvasClick = (event) => {
  if (state.running) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cols = parseInt(colsInput.value) || 30;
  const cellSize = canvas.width / cols;
  const colClicked = Math.floor(x / cellSize);
  const rowClicked = Math.floor(y / cellSize);

  state.cells[rowClicked][colClicked] = state.cells[rowClicked][colClicked]
    ? 0
    : 1;

  drawCell(
    colClicked,
    rowClicked,
    state.cells[rowClicked][colClicked],
    cellSize,
  );
};

const getHandlerResizeCanvas = () => debounce(resizeCanvas, 300);

export const initEventListeners = () => {
  startButton.addEventListener("click", handleStartClick);
  stopButton.addEventListener("click", handleStopClick);
  randomizeButton.addEventListener("click", handleRandomizeClick);
  canvas.addEventListener("click", handleCanvasClick);
  colsInput.addEventListener("change", getHandlerResizeCanvas());
  rowsInput.addEventListener("change", getHandlerResizeCanvas());
  window.addEventListener("resize", getHandlerResizeCanvas());
};
