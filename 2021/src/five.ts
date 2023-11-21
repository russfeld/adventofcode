export async function five_a(): Promise<number> {
  const file = Bun.file("inputs/five.txt");

  let arr: number[][] = [];
  for (let i = 0; i < 1000; i++) {
    arr[i] = [];
    for (let j = 0; j < 1000; j++) {
      arr[i][j] = 0;
    }
  }

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split(" -> ");
    const start: number[] = parts[0].split(",").map(Number);
    const end: number[] = parts[1].split(",").map(Number);
    arr = fill(arr, start, end);
  }

  const sum: number = arr.flat().filter((num) => num > 1).length;

  return sum;
}

function fill(
  arr: number[][],
  start: number[],
  end: number[],
  diag: boolean = false,
): number[][] {
  if (start[0] == end[0]) {
    if (start[1] < end[1]) {
      for (let i = start[1]; i <= end[1]; i++) {
        arr[start[0]][i]++;
      }
    } else {
      for (let i = end[1]; i <= start[1]; i++) {
        arr[start[0]][i]++;
      }
    }
  } else if (start[1] == end[1]) {
    if (start[0] < end[0]) {
      for (let i = start[0]; i <= end[0]; i++) {
        arr[i][start[1]]++;
      }
    } else {
      for (let i = end[0]; i <= start[0]; i++) {
        arr[i][start[1]]++;
      }
    }
  } else if (diag) {
    let x = start[0];
    let y = start[1];
    while (x != end[0] && y != end[1]) {
      arr[x][y]++;
      if (x < end[0]) {
        x++;
      } else {
        x--;
      }
      if (y < end[1]) {
        y++;
      } else {
        y--;
      }
    }
    arr[end[0]][end[1]]++;
  }
  return arr;
}

export async function five_b(): Promise<number> {
  const file = Bun.file("inputs/five.txt");

  let arr: number[][] = [];
  for (let i = 0; i < 1000; i++) {
    arr[i] = [];
    for (let j = 0; j < 1000; j++) {
      arr[i][j] = 0;
    }
  }

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split(" -> ");
    const start: number[] = parts[0].split(",").map(Number);
    const end: number[] = parts[1].split(",").map(Number);
    arr = fill(arr, start, end, true);
  }

  const sum: number = arr.flat().filter((num) => num > 1).length;

  return sum;
}

console.log(await five_a());
console.log(await five_b());
