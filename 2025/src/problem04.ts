export function problem04a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[][] = input.split("\n").map((x) => x.split(""));
  // console.log(array)
  const m: number = array.length;
  const n: number = array[0].length;
  let count: number = 0;
  for (let i: number = 0; i < m; i++) {
    for (let j: number = 0; j < n; j++) {
      if (array[i][j] == "@") {
        let sum: number = 0;
        sum += check(array, i - 1, j - 1, m, n);
        sum += check(array, i - 1, j, m, n);
        sum += check(array, i - 1, j + 1, m, n);
        sum += check(array, i, j + 1, m, n);
        sum += check(array, i + 1, j + 1, m, n);
        sum += check(array, i + 1, j, m, n);
        sum += check(array, i + 1, j - 1, m, n);
        sum += check(array, i, j - 1, m, n);
        if (sum < 4) {
          count += 1;
        }
      }
    }
  }
  return count;
}

function check(
  array: string[][],
  i: number,
  j: number,
  m: number,
  n: number,
): number {
  if (i < 0 || i >= m) {
    return 0;
  }
  if (j < 0 || j >= n) {
    return 0;
  }
  if (array[i][j] == "@" || array[i][j] == "X") {
    return 1;
  }
  return 0;
}

export function problem04b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[][] = input.split("\n").map((x) => x.split(""));
  // console.log(array)
  const m: number = array.length;
  const n: number = array[0].length;
  let count: number = 0;
  let removed: number = 1;
  while (removed > 0) {
    removed = 0;
    for (let i: number = 0; i < m; i++) {
      for (let j: number = 0; j < n; j++) {
        cleanup(array, i, j, m, n);
        if (array[i][j] == "@") {
          let sum: number = 0;
          sum += check(array, i - 1, j - 1, m, n);
          sum += check(array, i - 1, j, m, n);
          sum += check(array, i - 1, j + 1, m, n);
          sum += check(array, i, j + 1, m, n);
          sum += check(array, i + 1, j + 1, m, n);
          sum += check(array, i + 1, j, m, n);
          sum += check(array, i + 1, j - 1, m, n);
          sum += check(array, i, j - 1, m, n);
          if (sum < 4) {
            removed += 1;
            array[i][j] = "X";
          }
        }
      }
    }
    // for (const line of array) {
    //   console.log(line.join(""))
    // }
    // console.log(removed)
    count += removed;
  }
  return count;
}

function cleanup(
  array: string[][],
  i: number,
  j: number,
  m: number,
  n: number,
): void {
  if (i + 1 < m) {
    if (array[i + 1][j] == "X") {
      array[i + 1][j] = ".";
    }
    if (j + 1 < n) {
      if (array[i + 1][j + 1] == "X") {
        array[i + 1][j + 1] = ".";
      }
    }
  }
  if (j + 1 < n) {
    if (array[i][j + 1] == "X") {
      array[i][j + 1] = ".";
    }
  }
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem04a("inputs/04e.txt"));
  console.log(problem04b("inputs/04e.txt"));
  console.log("Real Inputs");
  console.log(problem04a("inputs/04.txt"));
  console.log(problem04b("inputs/04.txt"));
}

Deno.bench("problem04a", () => {
  problem04a("inputs/04.txt");
});

Deno.bench("problem04b", () => {
  problem04b("inputs/04.txt");
});
