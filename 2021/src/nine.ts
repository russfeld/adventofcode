export async function nine_a(): Promise<number> {
  const file = Bun.file("inputs/nine.txt");

  const heightmap: number[][] = [];
  let sum: number = 0;

  for (const line of (await file.text()).split("\n")) {
    heightmap.push(line.trim().split("").map(Number));
  }

  for (let i = 0; i < heightmap.length; i++) {
    for (let j = 0; j < heightmap[i].length; j++) {
      if (lowpoint(heightmap, i, j)) {
        sum += heightmap[i][j] + 1;
      }
    }
  }

  return sum;
}

function lowpoint(heightmap: number[][], i: number, j: number): boolean {
  if (i > 0) {
    if (heightmap[i - 1][j] <= heightmap[i][j]) {
      return false;
    }
  }
  if (i < heightmap.length - 1) {
    if (heightmap[i + 1][j] <= heightmap[i][j]) {
      return false;
    }
  }
  if (j > 0) {
    if (heightmap[i][j - 1] <= heightmap[i][j]) {
      return false;
    }
  }
  if (j < heightmap[i].length - 1) {
    if (heightmap[i][j + 1] <= heightmap[i][j]) {
      return false;
    }
  }
  return true;
}

export async function nine_b(): Promise<number> {
  const file = Bun.file("inputs/nine.txt");

  const heightmap: number[][] = [];
  let basins: number[] = [];

  for (const line of (await file.text()).split("\n")) {
    heightmap.push(line.trim().split("").map(Number));
  }

  for (let i = 0; i < heightmap.length; i++) {
    for (let j = 0; j < heightmap[i].length; j++) {
      if (lowpoint(heightmap, i, j)) {
        basins.push(basin(heightmap, i, j));
      }
    }
  }

  basins = basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
}

interface point {
  x: number;
  y: number;
}

function basin(heightmap: number[][], i: number, j: number): number {
  const contents: point[] = [];
  const queue: point[] = [{ x: i, y: j }];
  basin_recurse(heightmap, contents, queue);
  //console.log(contents.length);
  //print_contents(contents, heightmap);
  return contents.length;
}

function basin_recurse(
  heightmap: number[][],
  contents: point[],
  queue: point[],
): void {
  if (queue.length > 0) {
    const current: point = queue.pop() as point;
    if (!contains(contents, current.x, current.y)) {
      contents.push(current);

      const i = current.x;
      const j = current.y;

      if (i > 0) {
        if (heightmap[i - 1][j] < 9 && !contains(contents, i - 1, j)) {
          queue.push({ x: i - 1, y: j });
        }
      }
      if (i < heightmap.length - 1) {
        if (heightmap[i + 1][j] < 9 && !contains(contents, i + 1, j)) {
          queue.push({ x: i + 1, y: j });
        }
      }
      if (j > 0) {
        if (heightmap[i][j - 1] < 9 && !contains(contents, i, j - 1)) {
          queue.push({ x: i, y: j - 1 });
        }
      }
      if (j < heightmap[i].length - 1) {
        if (heightmap[i][j + 1] < 9 && !contains(contents, i, j + 1)) {
          queue.push({ x: i, y: j + 1 });
        }
      }
    }
    basin_recurse(heightmap, contents, queue);
  }
}

function contains(contents: point[], i: number, j: number): boolean {
  return contents.some((point) => point.x == i && point.y == j);
}

// function print_contents(contents: point[], heightmap: number[][]): void {
//   const output: string[][] = [];
//   for (let i = 0; i < 5; i++) {
//     output.push(["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]);
//   }
//   for (const current of contents) {
//     output[current.x][current.y] = heightmap[current.x][current.y] + "";
//   }

//   for (const line of output) {
//     console.log(line.join(""));
//   }
// }

console.log(await nine_a());
console.log(await nine_b());
