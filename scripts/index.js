import { resizeCanvas } from "./modules/board.js";
import { initEventListeners } from "./modules/controlManage.js";
import { setupGridCanvas } from "./modules/game.js";

function init() {
  setupGridCanvas();
  resizeCanvas();
  initEventListeners();
}

init();
