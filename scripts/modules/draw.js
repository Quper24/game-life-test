import { getCtx, getGridCanvas, getGridCtx } from "./controlManage.js";

export const drawCell = (x, y, alive, cellSize) => {
  const offCtx = getCtx();
  offCtx.fillStyle = alive ? "tomato" : "white";
  offCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

export const drawGridOnGridCanvas = (cols, rows, cellSize) => {
  const gridCtx = getGridCtx();
  const gridCanvas = getGridCanvas();
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  gridCtx.strokeStyle = "gray";
  for (let y = 0; y <= rows; y++) {
    gridCtx.beginPath();
    gridCtx.moveTo(0, y * cellSize);
    gridCtx.lineTo(cols * cellSize, y * cellSize);
    gridCtx.stroke();
  }
  for (let x = 0; x <= cols; x++) {
    gridCtx.beginPath();
    gridCtx.moveTo(x * cellSize, 0);
    gridCtx.lineTo(x * cellSize, rows * cellSize);
    gridCtx.stroke();
  }
};
