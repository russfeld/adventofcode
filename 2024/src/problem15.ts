export function problem15a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const parts = input.split(/\n\n/);
  const matrix = parts[0].split("\n").map((x) => x.split(""));
  const moves = parts[1].split("\n").join("").split("");

  let i = 0;
  let j = 0;
  let found = false;

  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "@") {
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  //console.log(i, j)

  for (const move of moves) {
    switch (move) {
      case "^":
        if (move_up(matrix, i, j)) {
          i--;
        }
        break;
      case ">":
        if (move_right(matrix, i, j)) {
          j++;
        }
        break;
      case "v":
        if (move_down(matrix, i, j)) {
          i++;
        }
        break;
      case "<":
        if (move_left(matrix, i, j)) {
          j--;
        }
        break;
    }
  }
  //console.log(matrix.map((x) => x.join("")).join("\n"));

  let sum: number = 0;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "O") {
        sum += 100 * i + j;
      }
    }
  }
  return sum;
}

function move_up(matrix: string[][], i: number, j: number): boolean {
  if (matrix[i - 1][j] === "#") {
    return false;
  }
  if (matrix[i - 1][j] === ".") {
    matrix[i][j] = ".";
    matrix[i - 1][j] = "@";
    return true;
  }
  if (matrix[i - 1][j] === "O") {
    let k = i - 1;
    while (matrix[k][j] === "O") {
      k--;
    }
    if (matrix[k][j] === "#") {
      return false;
    }
    if (matrix[k][j] === ".") {
      matrix[i][j] = ".";
      matrix[k][j] = "O";
      matrix[i - 1][j] = "@";
      return true;
    }
  }
  return false;
}

function move_down(matrix: string[][], i: number, j: number): boolean {
  if (matrix[i + 1][j] === "#") {
    return false;
  }
  if (matrix[i + 1][j] === ".") {
    matrix[i][j] = ".";
    matrix[i + 1][j] = "@";
    return true;
  }
  if (matrix[i + 1][j] === "O") {
    let k = i + 1;
    while (matrix[k][j] === "O") {
      k++;
    }
    if (matrix[k][j] === "#") {
      return false;
    }
    if (matrix[k][j] === ".") {
      matrix[i][j] = ".";
      matrix[k][j] = "O";
      matrix[i + 1][j] = "@";
      return true;
    }
  }
  return false;
}

function move_left(matrix: string[][], i: number, j: number): boolean {
  if (matrix[i][j - 1] === "#") {
    return false;
  }
  if (matrix[i][j - 1] === ".") {
    matrix[i][j] = ".";
    matrix[i][j - 1] = "@";
    return true;
  }
  if (matrix[i][j - 1] === "O") {
    let k = j - 1;
    while (matrix[i][k] === "O") {
      k--;
    }
    if (matrix[i][k] === "#") {
      return false;
    }
    if (matrix[i][k] === ".") {
      matrix[i][j] = ".";
      matrix[i][k] = "O";
      matrix[i][j - 1] = "@";
      return true;
    }
  }
  return false;
}

function move_right(matrix: string[][], i: number, j: number): boolean {
  if (matrix[i][j + 1] === "#") {
    return false;
  }
  if (matrix[i][j + 1] === ".") {
    matrix[i][j] = ".";
    matrix[i][j + 1] = "@";
    return true;
  }
  if (matrix[i][j + 1] === "O") {
    let k = j + 1;
    while (matrix[i][k] === "O") {
      k++;
    }
    if (matrix[i][k] === "#") {
      return false;
    }
    if (matrix[i][k] === ".") {
      matrix[i][j] = ".";
      matrix[i][k] = "O";
      matrix[i][j + 1] = "@";
      return true;
    }
  }
  return false;
}

export function problem15b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const parts = input.split(/\n\n/);
  const matrix = parts[0].split("\n").map((x) => x.split(""));
  const moves = parts[1].split("\n").join("").split("");

  let x = 0;
  let y = 0;

  const matrix2: string[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    matrix2.push([]);
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "O") {
        matrix2[i].push("[");
        matrix2[i].push("]");
      } else if (matrix[i][j] === "#") {
        matrix2[i].push("#");
        matrix2[i].push("#");
      } else if (matrix[i][j] === ".") {
        matrix2[i].push(".");
        matrix2[i].push(".");
      } else {
        matrix2[i].push("@");
        matrix2[i].push(".");
        x = i;
        y = j * 2;
      }
    }
  }

  //console.log(matrix2.map((x) => x.join("")).join("\n"));
  for (const move of moves) {
    switch (move) {
      case "^":
        if (move_up_2(matrix2, x, y)) {
          x--;
        }
        break;
      case ">":
        if (move_right_2(matrix2, x, y)) {
          y++;
        }
        break;
      case "v":
        if (move_down_2(matrix2, x, y)) {
          x++;
        }
        break;
      case "<":
        if (move_left_2(matrix2, x, y)) {
          y--;
        }
        break;
    }
  }
  //console.log(matrix2.map((x) => x.join("")).join("\n"));

  let sum: number = 0;
  for (let i = 0; i < matrix2.length; i++) {
    for (let j = 0; j < matrix2[i].length; j++) {
      if (matrix2[i][j] === "[") {
        sum += 100 * i + j;
      }
    }
  }
  return sum;
}

function move_up_2(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x - 1][y] == "#") {
    return false;
  }
  if (matrix[x - 1][y] == ".") {
    matrix[x][y] = ".";
    matrix[x - 1][y] = "@";
    return true;
  }
  if (matrix[x - 1][y] == "]" && can_move_up(matrix, x - 1, y - 1)) {
    move_up_box(matrix, x - 1, y - 1);
    matrix[x][y] = ".";
    matrix[x - 1][y] = "@";
    return true;
  }
  if (matrix[x - 1][y] == "[" && can_move_up(matrix, x - 1, y)) {
    move_up_box(matrix, x - 1, y);
    matrix[x][y] = ".";
    matrix[x - 1][y] = "@";
    return true;
  }
  return false;
}

function can_move_up(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x - 1][y] == "." && matrix[x - 1][y + 1] == ".") {
    return true;
  }
  if (matrix[x - 1][y] == "#" || matrix[x - 1][y + 1] == "#") {
    return false;
  }
  if (matrix[x - 1][y] == "[") {
    return can_move_up(matrix, x - 1, y);
  }
  if (matrix[x - 1][y] == "]" && matrix[x - 1][y + 1] == ".") {
    return can_move_up(matrix, x - 1, y - 1);
  }
  if (matrix[x - 1][y + 1] == "[" && matrix[x - 1][y] == ".") {
    return can_move_up(matrix, x - 1, y + 1);
  }
  if (matrix[x - 1][y] == "]" && matrix[x - 1][y + 1] == "[") {
    return can_move_up(matrix, x - 1, y - 1) && can_move_up(matrix, x - 1, y + 1);
  }
  console.log("unhandled case can move up", x, y);
  return false;
}

function move_up_box(matrix: string[][], x: number, y: number): void {
  if (matrix[x - 1][y] == "[") {
    move_up_box(matrix, x - 1, y);
  }
  if (matrix[x - 1][y] == "]") {
    move_up_box(matrix, x - 1, y - 1);
  }
  if (matrix[x - 1][y + 1] == "[") {
    move_up_box(matrix, x - 1, y + 1);
  }
  matrix[x - 1][y] = "[";
  matrix[x - 1][y + 1] = "]";
  matrix[x][y] = ".";
  matrix[x][y + 1] = ".";
  return;
}

function move_down_2(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x + 1][y] == "#") {
    return false;
  }
  if (matrix[x + 1][y] == ".") {
    matrix[x][y] = ".";
    matrix[x + 1][y] = "@";
    return true;
  }
  if (matrix[x + 1][y] == "]" && can_move_down(matrix, x + 1, y - 1)) {
    move_down_box(matrix, x + 1, y - 1);
    matrix[x][y] = ".";
    matrix[x + 1][y] = "@";
    return true;
  }
  if (matrix[x + 1][y] == "[" && can_move_down(matrix, x + 1, y)) {
    move_down_box(matrix, x + 1, y);
    matrix[x][y] = ".";
    matrix[x + 1][y] = "@";
    return true;
  }
  return false;
}

function can_move_down(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x + 1][y] == "." && matrix[x + 1][y + 1] == ".") {
    return true;
  }
  if (matrix[x + 1][y] == "#" || matrix[x + 1][y + 1] == "#") {
    return false;
  }
  if (matrix[x + 1][y] == "[") {
    return can_move_down(matrix, x + 1, y);
  }
  if (matrix[x + 1][y] == "]" && matrix[x + 1][y + 1] == ".") {
    return can_move_down(matrix, x + 1, y - 1);
  }
  if (matrix[x + 1][y + 1] == "[" && matrix[x + 1][y] == ".") {
    return can_move_down(matrix, x + 1, y + 1);
  }
  if (matrix[x + 1][y] == "]" && matrix[x + 1][y + 1] == "[") {
    return can_move_down(matrix, x + 1, y - 1) && can_move_down(matrix, x + 1, y + 1);
  }
  console.log("unhandled case can move down", x, y);
  return false;
}

function move_down_box(matrix: string[][], x: number, y: number): void {
  if (matrix[x + 1][y] == "[") {
    move_down_box(matrix, x + 1, y);
  }
  if (matrix[x + 1][y] == "]") {
    move_down_box(matrix, x + 1, y - 1);
  }
  if (matrix[x + 1][y + 1] == "[") {
    move_down_box(matrix, x + 1, y + 1);
  }
  matrix[x + 1][y] = "[";
  matrix[x + 1][y + 1] = "]";
  matrix[x][y] = ".";
  matrix[x][y + 1] = ".";
  return;
}

function move_left_2(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x][y - 1] === "#") {
    return false;
  }
  if (matrix[x][y - 1] === ".") {
    matrix[x][y] = ".";
    matrix[x][y - 1] = "@";
    return true;
  }
  if (matrix[x][y - 1] === "]") {
    let k = y - 1;
    while (matrix[x][k] === "]") {
      k -= 2;
    }
    if (matrix[x][k] === "#") {
      return false;
    }
    if (matrix[x][k] === ".") {
      matrix[x][k] = "[";
      k++;
      while (k < y - 1) {
        if (matrix[x][k] === "]") {
          matrix[x][k] = "[";
        } else {
          matrix[x][k] = "]";
        }
        k++;
      }
      matrix[x][y - 1] = "@";
      matrix[x][y] = ".";
      return true;
    }
  }
  return false;
}

function move_right_2(matrix: string[][], x: number, y: number): boolean {
  if (matrix[x][y + 1] === "#") {
    return false;
  }
  if (matrix[x][y + 1] === ".") {
    matrix[x][y] = ".";
    matrix[x][y + 1] = "@";
    return true;
  }
  if (matrix[x][y + 1] === "[") {
    let k = y + 1;
    while (matrix[x][k] === "[") {
      k += 2;
    }
    if (matrix[x][k] === "#") {
      return false;
    }
    if (matrix[x][k] === ".") {
      matrix[x][k] = "]";
      k--;
      while (k > y + 1) {
        if (matrix[x][k] === "]") {
          matrix[x][k] = "[";
        } else {
          matrix[x][k] = "]";
        }
        k--;
      }
      matrix[x][y + 1] = "@";
      matrix[x][y] = ".";
      return true;
    }
  }
  return false;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem15a("inputs/15e.txt"));
  console.log(problem15b("inputs/15e.txt"));
  console.log("Real Inputs");
  console.log(problem15a("inputs/15.txt"));
  console.log(problem15b("inputs/15.txt"));
}

Deno.bench("problem15a", () => {
  problem15a("inputs/15.txt");
});

Deno.bench("problem15b", () => {
  problem15b("inputs/15.txt");
});
