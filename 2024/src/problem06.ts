export function problem06a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const map: string[][] = input.split("\n").map((line) => line.split(""));
  const m = map.length;
  const n = map[0].length;
  let guard: [number, number] = [0, 0];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === "^") {
        map[i][j] = "X";
        guard = [i, j];
        break;
      }
    }
  }
  let dir: [number, number] = [-1, 0];
  let count = 1;
  while (
    guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 &&
    guard[1] + dir[1] < n
  ) {
    if (map[guard[0] + dir[0]][guard[1] + dir[1]] === "#") {
      if (dir[0] === -1 && dir[1] === 0) {
        dir = [0, 1];
      } else if (dir[0] === 0 && dir[1] === 1) {
        dir = [1, 0];
      } else if (dir[0] === 1 && dir[1] === 0) {
        dir = [0, -1];
      } else if (dir[0] === 0 && dir[1] === -1) {
        dir = [-1, 0];
      }
    }
    guard = [guard[0] + dir[0], guard[1] + dir[1]];
    if (map[guard[0]][guard[1]] === ".") {
      map[guard[0]][guard[1]] = "X";
      count++;
    }
  }
  // console.log(map.map((x) => x.join("")).join("\n"));
  return count;
}

export function problem06b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const map: string[][] = input.split("\n").map((line) => line.split(""));
  const m = map.length;
  const n = map[0].length;
  let guard: [number, number] = [0, 0];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === "^") {
        map[i][j] = "X";
        guard = [i, j];
        break;
      }
    }
  }
  const initial: [number, number] = [guard[0], guard[1]];
  let dir: [number, number] = [-1, 0];
  while (
    guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 &&
    guard[1] + dir[1] < n
  ) {
    if (map[guard[0] + dir[0]][guard[1] + dir[1]] === "#") {
      if (dir[0] === -1 && dir[1] === 0) {
        dir = [0, 1];
      } else if (dir[0] === 0 && dir[1] === 1) {
        dir = [1, 0];
      } else if (dir[0] === 1 && dir[1] === 0) {
        dir = [0, -1];
      } else if (dir[0] === 0 && dir[1] === -1) {
        dir = [-1, 0];
      }
    }
    guard = [guard[0] + dir[0], guard[1] + dir[1]];
    if (map[guard[0]][guard[1]] === ".") {
      map[guard[0]][guard[1]] = "X";
    }
  }
  let count: number = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === "X") {
        if (check_loop(map, [i, j], initial)) {
          count++;
        }
      }
    }
  }
  return count;
}

function check_loop(
  map: string[][],
  obstacle: [number, number],
  guard: [number, number],
): boolean {
  const m = map.length;
  const n = map[0].length;
  // deep copy the array
  map = map.map((x) => x.slice());
  map[obstacle[0]][obstacle[1]] = "#";
  let dir: [number, number] = [-1, 0];
  // console.log(map.map((x) => x.join("")).join("\n"));
  let steps: number = 0;
  while (
    guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 &&
    guard[1] + dir[1] < n
  ) {
    if (map[guard[0] + dir[0]][guard[1] + dir[1]] === "#") {
      if (dir[0] === -1 && dir[1] === 0) {
        dir = [0, 1];
      } else if (dir[0] === 0 && dir[1] === 1) {
        dir = [1, 0];
      } else if (dir[0] === 1 && dir[1] === 0) {
        dir = [0, -1];
      } else if (dir[0] === 0 && dir[1] === -1) {
        dir = [-1, 0];
      }
      continue;
    }
    guard = [guard[0] + dir[0], guard[1] + dir[1]];
    steps++;
    if (steps > m * n) {
      return true;
    }
  }
  return false;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem06a("inputs/06e.txt"));
  console.log(problem06b("inputs/06e.txt"));
  console.log("Real Inputs");
  console.log(problem06a("inputs/06.txt"));
  console.log(problem06b("inputs/06.txt"));
}

Deno.bench("problem06a", () => {
  problem06a("inputs/06.txt");
});

Deno.bench("problem06b", () => {
  problem06b("inputs/06.txt");
});
