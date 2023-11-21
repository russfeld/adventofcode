export async function four_a(): Promise<number> {
  const file = Bun.file("inputs/four.txt");

  let inputs: string[] = [];
  let boards: string[][][] = [];
  let board: string[][] = [];

  for (const line of (await file.text()).split("\n")) {
    if (inputs.length == 0) {
      inputs = line.split(",");
    } else {
      if (line.trim().length == 0) {
        if (board.length > 0) {
          boards.push(board);
          board = [];
        }
      } else {
        board.push(line.trim().split(/\s+/));
      }
    }
  }
  boards.push(board);

  for (const input of inputs) {
    // console.log("checking input " + input)
    boards = boards.map((board) => mark(board, input));
    // console.log(boards)
    for (const board of boards) {
      if (row_check(board) || col_check(board)) {
        return compute(board, parseInt(input));
      }
    }
  }

  return 0;
}

function mark(board: string[][], value: string): string[][] {
  return board.map((row) => row.map((elem) => (elem == value ? "-1" : elem)));
}

function row_check(board: string[][]): boolean {
  for (const row of board) {
    let win: boolean = true;
    for (const item of row) {
      if (item != "-1") {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function col_check(board: string[][]): boolean {
  for (const i of Array(board.length).keys()) {
    let win: boolean = true;
    for (const j of Array(board.length).keys()) {
      if (board[j][i] != "-1") {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function compute(board: string[][], value: number): number {
  const vals: number[][] = board.map((row) =>
    row.map((elem) => parseInt(elem)),
  );
  const sum = vals
    .flat()
    .filter((num) => num > 0)
    .reduce((sum, value) => sum + value);
  return sum * value;
}

export async function four_b(): Promise<number> {
  const file = Bun.file("inputs/four.txt");

  let inputs: string[] = [];
  let boards: string[][][] = [];
  let board: string[][] = [];

  for (const line of (await file.text()).split("\n")) {
    if (inputs.length == 0) {
      inputs = line.split(",");
    } else {
      if (line.trim().length == 0) {
        if (board.length > 0) {
          boards.push(board);
          board = [];
        }
      } else {
        board.push(line.trim().split(/\s+/));
      }
    }
  }
  boards.push(board);

  for (const input of inputs) {
    boards = boards.map((board) => mark(board, input));
    if (boards.length == 1) {
      if (row_check(boards[0]) || col_check(boards[0])) {
        return compute(boards[0], parseInt(input));
      }
    } else {
      boards = boards.filter(
        (board) => !(row_check(board) || col_check(board)),
      );
    }
    // console.log(boards);
  }

  return 0;
}

console.log(await four_a());
console.log(await four_b());
