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
  while(guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 && guard[1] + dir[1] < n) {
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
        guard = [i, j];
        break;
      }
    }
  }
  let dir: [number, number] = [-1, 0];
  const spots: [[number, number]] = [[-1, -1]];
  while(guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 && guard[1] + dir[1] < n) {
    while (map[guard[0] + dir[0]][guard[1] + dir[1]] === "#") {
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
    if(!spots.some((x) => x[0] === guard[0] + dir[0] && x[1] === guard[1] + dir[1])) {
      if(check_loop(map, guard, dir)) {
        spots.push([guard[0] + dir[0], guard[1] + dir[1]]);
      }
    }
    guard = [guard[0] + dir[0], guard[1] + dir[1]];
    if (map[guard[0]][guard[1]] === ".") {
      if (dir[0] === -1 && dir[1] === 0) {
        map[guard[0]][guard[1]] = "^";
      } else if (dir[0] === 0 && dir[1] === 1) {
        map[guard[0]][guard[1]] = ">";
      } else if (dir[0] === 1 && dir[1] === 0) {
        map[guard[0]][guard[1]] = "v";
      } else if (dir[0] === 0 && dir[1] === -1) {
        map[guard[0]][guard[1]] = "<";
      }
    }
  }
  return spots.length - 1;
}

function check_loop (map: string[][], guard: [number, number], dir: [number, number]): boolean {
  const m = map.length;
  const n = map[0].length;
  // deep copy the array
  map = map.map((x) => x.slice());
  map[guard[0] + dir[0]][guard[1] + dir[1]] = "#";
  // console.log(map.map((x) => x.join("")).join("\n"));
  while(guard[0] + dir[0] >= 0 && guard[0] + dir[0] < m && guard[1] + dir[1] >= 0 && guard[1] + dir[1] < n) {
    while (map[guard[0] + dir[0]][guard[1] + dir[1]] === "#") {
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
    if (dir[0] == -1 && dir[1] == 0 && map[guard[0]][guard[1]] === "^") {
      return true;
    }
    if (dir[0] == 0 && dir[1] == 1 && map[guard[0]][guard[1]] === ">") {
      return true;
    }
    if (dir[0] == 1 && dir[1] == 0 && map[guard[0]][guard[1]] === "v") {
      return true;
    }
    if (dir[0] == 0 && dir[1] == -1 && map[guard[0]][guard[1]] === "<") {
      return true;
    }
    if (map[guard[0]][guard[1]] === ".") {
      if (dir[0] === -1 && dir[1] === 0) {
        map[guard[0]][guard[1]] = "^";
      } else if (dir[0] === 0 && dir[1] === 1) {
        map[guard[0]][guard[1]] = ">";
      } else if (dir[0] === 1 && dir[1] === 0) {
        map[guard[0]][guard[1]] = "v";
      } else if (dir[0] === 0 && dir[1] === -1) {
        map[guard[0]][guard[1]] = "<";
      }
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
