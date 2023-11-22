export async function eleven_a(): Promise<number> {
  const file = Bun.file("inputs/eleven.txt");
  const grid: number[][] = [];

  for (const line of (await file.text()).split("\n")) {
    grid.push(line.trim().split("").map(Number));
  }

  let total: number = 0;

  for (let i = 0; i < 100; i++) {
    increment(grid);
    const flashes: point[] = [];
    flash(grid, flashes);
    let count: number = 0;
    while (flashes.length > count) {
      count = flashes.length;
      flash(grid, flashes);
    }
    total += flashes.length;
    reset(grid);
    // printgrid(grid);
    // console.log("");
  }

  return total;
}

interface point {
  x: number;
  y: number;
}

function increment(grid: number[][]): void {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j]++;
    }
  }
}

function flash(grid: number[][], flashes: point[]): void {
  const new_flashes: point[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 9) {
        new_flashes.push({ x: i, y: j });
      }
    }
  }
  for (const flash of new_flashes) {
    if (!contains(flashes, flash.x, flash.y)) {
      spread(grid, flash.x, flash.y);
      flashes.push(flash);
    }
  }
}

function contains(contents: point[], i: number, j: number): boolean {
  return contents.some((point) => point.x == i && point.y == j);
}

function spread(grid: number[][], i: number, j: number): void {
  if (i > 0) {
    if (j > 0) {
      grid[i - 1][j - 1]++;
    }
    grid[i - 1][j]++;
    if (j < grid[i].length - 1) {
      grid[i - 1][j + 1]++;
    }
  }
  if (i < grid.length - 1) {
    if (j > 0) {
      grid[i + 1][j - 1]++;
    }
    grid[i + 1][j]++;
    if (j < grid[i].length - 1) {
      grid[i + 1][j + 1]++;
    }
  }
  if (j > 0) {
    grid[i][j - 1]++;
  }
  if (j < grid[i].length - 1) {
    grid[i][j + 1]++;
  }
}

// function printgrid(grid: number[][]) {
//   for (const line of grid) {
//     console.log(line.join(""));
//   }
// }

function reset(grid: number[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 9) {
        grid[i][j] = 0;
      }
    }
  }
}

export async function eleven_b(): Promise<number> {
  const file = Bun.file("inputs/eleven.txt");
  const grid: number[][] = [];

  for (const line of (await file.text()).split("\n")) {
    grid.push(line.trim().split("").map(Number));
  }

  let i: number = 0;
  let flashes: point[] = [];

  while (flashes.length != grid.length * grid[0].length) {
    i++;
    increment(grid);
    flashes = [];
    flash(grid, flashes);
    let count: number = 0;
    while (flashes.length > count) {
      count = flashes.length;
      flash(grid, flashes);
    }
    if (flashes.length == grid.length * grid[0].length) {
      break;
    }
    reset(grid);
    // printgrid(grid);
    // console.log("");
  }

  return i;
}

console.log(await eleven_a());
console.log(await eleven_b());
