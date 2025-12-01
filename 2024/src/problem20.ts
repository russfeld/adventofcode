export function problem20a(inputfile: string): number {
  const maze = Deno.readTextFileSync(inputfile).split("\n").map((x) => x.split(""));
  let x = 0;
  let y = 0;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "S") {
        x = i;
        y = j;
      }
    }
  }
  console.log(x, y);
  let steps: number = 0;
  while(maze[x][y] !== "E") {
    maze[x][y] = `${steps}`;
    steps++;
    if (maze[x + 1][y] === "." || maze[x + 1][y] === "E") {
      x++;
    } else if (maze[x - 1][y] === "." || maze[x - 1][y] === "E") {
      x--;
    } else if (maze[x][y + 1] === "." || maze[x][y + 1] === "E") {
      y++;
    } else if (maze[x][y - 1] === "." || maze[x][y - 1] === "E") {
      y--;
    }
    // console.log(x, y);
    // if (steps > 100) {
    //   break;
    // }
  }
  maze[x][y] = `${steps}`;
  // console.log(maze);
  let out = "";
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "#") {
        out += "## ";
      } else {
        out += maze[i][j].padStart(2, "0") + " ";
      }
    }
    out += "\n";
  }
  console.log(out);
  const shortcuts: number[] = [];
  for(let i = 1; i < maze.length - 1; i++) {
    for (let j = 1; j < maze[i].length - 1; j++) {
      if (maze[i][j] === "#") {
        continue;
      }
      const start = Number.parseInt(maze[i][j]);
      // down once
      if (maze[i+1][j] === "#") {
        let end = -1;
        if (i + 2 < maze.length && maze[i+2][j] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i+2][j]) - start) - 2;
          if (dist > end) {
            end = dist;
          }
        } 
        //down twice
        if (i + 3 < maze.length && maze[i+3][j] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i+3][j]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        // down left
        if (i + 2 < maze.length && maze[i+2][j-1] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i+2][j-1]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        // down right
        if (i + 2 < maze.length && maze[i+2][j+1] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i+2][j+1]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        if (end > 0) {
          console.log(start, end);
          shortcuts.push(end);
        }
      }
      // right
      if (maze[i][j+1] === "#") {
        let end = -1;
        if (j + 2 < maze[i].length && maze[i][j+2] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i][j+2]) - start) - 2;
          if (dist > end) {
            end = dist;
          }
        }
        // right twice
        if (j + 3 < maze[i].length && maze[i][j+3] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i][j+3]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        // right down
        if (j + 2 < maze[i].length &&maze[i+1][j+2] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i+1][j+2]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        // right up
        if (j + 2 < maze[i].length &&maze[i-1][j+2] !== "#") {
          const dist = Math.abs(Number.parseInt(maze[i-1][j+2]) - start) - 3;
          if (dist > end) {
            end = dist;
          }
        }
        if (end > 0) {
          console.log(start, end);
          shortcuts.push(end);
        }
      }
    }
  }
  console.log(shortcuts.sort((a, b) => a - b));
  console.log(shortcuts.length)
  return steps;
}

export function problem20b(inputfile: string): number {
  return inputfile.length * 0;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem20a("inputs/20e.txt"));
  // console.log(problem20b("inputs/20e.txt"));
  console.log("Real Inputs");
  //console.log(problem20a("inputs/20.txt"));
  // console.log(problem20b("inputs/20.txt"));
}

Deno.bench("problem20a", () => {
  problem20a("inputs/20.txt");
});

Deno.bench("problem20b", () => {
  problem20b("inputs/20.txt");
});
