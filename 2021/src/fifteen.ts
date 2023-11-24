import { MinQueue } from "heapify";

interface point {
  x: number;
  y: number;
}

export async function fifteen_a(): Promise<number> {
  const file = Bun.file("inputs/fifteen.txt");
  const grid: number[][] = [];

  for (const line of (await file.text()).split("\n")) {
    grid.push(line.trim().split("").map(Number));
  }

  const weights: number[][] = [];
  for (let i = 0; i < grid.length; i++) {
    weights.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      weights[i].push(Number.MAX_SAFE_INTEGER);
    }
  }
  weights[0][0] = 0;

  const queue: MinQueue = new MinQueue(
    grid.length * grid[0].length,
    [],
    [],
    Uint32Array,
    Uint32Array,
  );
  const end = tonumber(grid.length - 1, grid[0].length - 1, grid.length);
  const visited: Set<number> = new Set();

  let current = 0;
  while (current != end) {
    const coords = tocoords(current, grid.length);
    // console.log(current);
    // console.log(coords);
    const weight = weights[coords.x][coords.y];

    // up
    if (
      coords.x > 0 &&
      !visited.has(tonumber(coords.x - 1, coords.y, grid.length))
    ) {
      const newweight = weight + grid[coords.x - 1][coords.y];
      if (newweight < weights[coords.x - 1][coords.y]) {
        weights[coords.x - 1][coords.y] = newweight;
        queue.push(tonumber(coords.x - 1, coords.y, grid.length), newweight);
        // console.log("push down : " + newweight);
      }
    }

    // down
    if (
      coords.x < grid.length - 1 &&
      !visited.has(tonumber(coords.x + 1, coords.y, grid.length))
    ) {
      const newweight = weight + grid[coords.x + 1][coords.y];
      if (newweight < weights[coords.x + 1][coords.y]) {
        weights[coords.x + 1][coords.y] = newweight;
        queue.push(tonumber(coords.x + 1, coords.y, grid.length), newweight);
        // console.log("push up : " + newweight);
      }
    }

    // left
    if (
      coords.y > 0 &&
      !visited.has(tonumber(coords.x, coords.y - 1, grid.length))
    ) {
      const newweight = weight + grid[coords.x][coords.y - 1];
      if (newweight < weights[coords.x][coords.y - 1]) {
        weights[coords.x][coords.y - 1] = newweight;
        queue.push(tonumber(coords.x, coords.y - 1, grid.length), newweight);
        // console.log("push left : " + newweight);
      }
    }

    // right
    if (
      coords.y < grid[0].length - 1 &&
      !visited.has(tonumber(coords.x, coords.y + 1, grid.length))
    ) {
      const newweight = weight + grid[coords.x][coords.y + 1];
      if (newweight < weights[coords.x][coords.y + 1]) {
        weights[coords.x][coords.y + 1] = newweight;
        queue.push(tonumber(coords.x, coords.y + 1, grid.length), newweight);
        // console.log("push right : " + newweight);
      }
    }

    visited.add(current);
    current = queue.pop() as number;
  }

  return weights[grid.length - 1][grid[0].length - 1];
}

function tonumber(x: number, y: number, size: number): number {
  return x * size + y;
}

function tocoords(id: number, size: number): point {
  return { x: Math.floor(id / size), y: id % size };
}

export async function fifteen_b(): Promise<number> {
  const file = Bun.file("inputs/fifteen.txt");
  const orig_grid: number[][] = [];

  for (const line of (await file.text()).split("\n")) {
    let row: number[] = line.trim().split("").map(Number);
    row = row.concat(
      row.map((a) => (a + 1 > 9 ? (a + 2) % 10 : a + 1)),
      row.map((a) => (a + 2 > 9 ? (a + 3) % 10 : a + 2)),
      row.map((a) => (a + 3 > 9 ? (a + 4) % 10 : a + 3)),
      row.map((a) => (a + 4 > 9 ? (a + 5) % 10 : a + 4)),
    );
    orig_grid.push(row);
  }

  const grid: number[][] = [];

  for (let i = 0; i < 5; i++) {
    for (const row of orig_grid) {
      grid.push(row.map((a) => (a + i > 9 ? (a + i + 1) % 10 : a + i)));
    }
  }

  // console.log(grid);
  // console.log(grid.length + " : " + grid[0].length);

  const weights: number[][] = [];
  for (let i = 0; i < grid.length; i++) {
    weights.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      weights[i].push(Number.MAX_SAFE_INTEGER);
    }
  }
  weights[0][0] = 0;

  const queue: MinQueue = new MinQueue(
    grid.length * grid[0].length,
    [],
    [],
    Uint32Array,
    Uint32Array,
  );
  const end = tonumber(grid.length - 1, grid[0].length - 1, grid.length);
  const visited: Set<number> = new Set();

  let current = 0;
  while (current != end) {
    const coords = tocoords(current, grid.length);
    // console.log(current);
    // console.log(coords);
    const weight = weights[coords.x][coords.y];

    // up
    if (
      coords.x > 0 &&
      !visited.has(tonumber(coords.x - 1, coords.y, grid.length))
    ) {
      const newweight = weight + grid[coords.x - 1][coords.y];
      if (newweight < weights[coords.x - 1][coords.y]) {
        weights[coords.x - 1][coords.y] = newweight;
        queue.push(tonumber(coords.x - 1, coords.y, grid.length), newweight);
        // console.log("push down : " + newweight);
      }
    }

    // down
    if (
      coords.x < grid.length - 1 &&
      !visited.has(tonumber(coords.x + 1, coords.y, grid.length))
    ) {
      const newweight = weight + grid[coords.x + 1][coords.y];
      if (newweight < weights[coords.x + 1][coords.y]) {
        weights[coords.x + 1][coords.y] = newweight;
        queue.push(tonumber(coords.x + 1, coords.y, grid.length), newweight);
        // console.log("push up : " + newweight);
      }
    }

    // left
    if (
      coords.y > 0 &&
      !visited.has(tonumber(coords.x, coords.y - 1, grid.length))
    ) {
      const newweight = weight + grid[coords.x][coords.y - 1];
      if (newweight < weights[coords.x][coords.y - 1]) {
        weights[coords.x][coords.y - 1] = newweight;
        queue.push(tonumber(coords.x, coords.y - 1, grid.length), newweight);
        // console.log("push left : " + newweight);
      }
    }

    // right
    if (
      coords.y < grid[0].length - 1 &&
      !visited.has(tonumber(coords.x, coords.y + 1, grid.length))
    ) {
      const newweight = weight + grid[coords.x][coords.y + 1];
      if (newweight < weights[coords.x][coords.y + 1]) {
        weights[coords.x][coords.y + 1] = newweight;
        queue.push(tonumber(coords.x, coords.y + 1, grid.length), newweight);
        // console.log("push right : " + newweight);
      }
    }

    visited.add(current);
    current = queue.pop() as number;
  }

  return weights[grid.length - 1][grid[0].length - 1];
}

console.log(await fifteen_a());
console.log(await fifteen_b());
