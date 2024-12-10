export function problem04a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  // original array
  const matrix1: string[][] = input.split("\n").map((line) => line.split(""));
  // transposed array
  const matrix2: string[][] = [];
  for (let i = 0; i < matrix1.length; i++) {
    matrix2.push(matrix1.map((x) => x[i]));
  }
  // diagonal arrays
  const matrix3: string[][] = [];
  const matrix4: string[][] = [];
  const diagonals: number = matrix1.length + matrix1[0].length - 1;
  for (let i = 0; i < diagonals; i++) {
    matrix3.push([]);
    matrix4.push([]);
    for (let j = 0; j <= i; j++) {
      if (j < matrix1.length && i - j < matrix1[0].length) {
        matrix3[i].push(matrix1[j][i - j]);
        matrix4[i].push(matrix1[matrix1.length - j - 1][i - j]);
      }
    }
  }
  const all = matrix1.map((x) => x.join("")).concat(
    matrix2.map((x) => x.join("")),
    matrix3.map((x) => x.join("")),
    matrix4.map((x) => x.join("")),
  );
  const regex = /(?=(XMAS|SAMX))/gi;
  const sum = all.map((x) =>
    x.match(regex) === null ? 0 : x.match(regex)!.length
  ).reduce((a, b) => a + b);
  return sum;
}

export function problem04b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  // original array
  const matrix1: string[][] = input.split("\n").map((line) => line.split(""));
  let count: number = 0;
  for (let i = 1; i < matrix1.length - 1; i++) {
    for (let j = 1; j < matrix1[i].length - 1; j++) {
      if (matrix1[i][j] === "A") {
        const one = matrix1[i - 1][j - 1];
        const two = matrix1[i - 1][j + 1];
        const three = matrix1[i + 1][j - 1];
        const four = matrix1[i + 1][j + 1];
        if (
          ((one == "S" && four == "M") || (one == "M" && four == "S")) &&
          ((two == "S" && three == "M") || (two == "M" && three == "S"))
        ) {
          count++;
        }
      }
    }
  }
  return count;
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
