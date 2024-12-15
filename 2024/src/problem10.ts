export function problem10a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix: number[][] = input.split("\n").map((line) =>
    line.split("").map((x) => Number.parseInt(x))
  );
  let sum: number = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        const count = trailwalk(matrix, i, j, 0);
        // console.log(count);
        sum += count.size;
      }
    }
  }
  return sum;
}

function trailwalk(
  matrix: number[][],
  i: number,
  j: number,
  step: number,
): Set<string> {
  if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[i].length) {
    return new Set();
  }
  if (matrix[i][j] != step) {
    return new Set();
  }
  if (step == 9) {
    return new Set([i + "," + j]);
  }
  step++;
  return trailwalk(matrix, i + 1, j, step).union(
    trailwalk(matrix, i - 1, j, step),
  ).union(trailwalk(matrix, i, j + 1, step)).union(
    trailwalk(matrix, i, j - 1, step),
  );
}

export function problem10b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix: number[][] = input.split("\n").map((line) =>
    line.split("").map((x) => Number.parseInt(x))
  );
  let sum: number = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        const count = trailwalkall(matrix, i, j, 0);
        // console.log(count);
        sum += count.length;
      }
    }
  }
  return sum;
}

function trailwalkall(
  matrix: number[][],
  i: number,
  j: number,
  step: number,
): string[] {
  if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[i].length) {
    return [];
  }
  if (matrix[i][j] != step) {
    return [];
  }
  if (step == 9) {
    return [i + "," + j];
  }
  step++;
  return trailwalkall(matrix, i + 1, j, step).concat(
    trailwalkall(matrix, i - 1, j, step),
  ).concat(trailwalkall(matrix, i, j + 1, step)).concat(
    trailwalkall(matrix, i, j - 1, step),
  );
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem10a("inputs/10e.txt"));
  console.log(problem10b("inputs/10e.txt"));
  console.log("Real Inputs");
  console.log(problem10a("inputs/10.txt"));
  console.log(problem10b("inputs/10.txt"));
}

Deno.bench("problem10a", () => {
  problem10a("inputs/10.txt");
});

Deno.bench("problem10b", () => {
  problem10b("inputs/10.txt");
});
