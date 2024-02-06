const state = {
  cells: [],
  previousCells: [],
  neighborsMap: [],
  running: false,

  setCells(newCells) {
    if (Array.isArray(newCells)) {
      this.cells = newCells;
    }
  },

  setPreviousCells(newCells) {
    if (Array.isArray(newCells)) {
      this.previousCells = newCells;
    }
  },
};

export default state;
