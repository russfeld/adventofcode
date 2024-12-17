import * as math from "mathjs";

export function problem13a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const lines = input.split("\n");
  let sum: number = 0;
  for (let i = 0; i < lines.length; i += 4) {
    const regex1 = /Button (A|B): X\+(\d+), Y\+(\d+)/g;
    const regex2 = /Prize: X=(\d+), Y=(\d+)/g;
    const match1 = [...lines[i].matchAll(regex1)];
    const match2 = [...lines[i + 1].matchAll(regex1)];
    const match3 = [...lines[i + 2].matchAll(regex2)];

    const aX = Number.parseInt(match1[0][2]);
    const aY = Number.parseInt(match1[0][3]);
    const bX = Number.parseInt(match2[0][2]);
    const bY = Number.parseInt(match2[0][3]);
    const pX = Number.parseInt(match3[0][1]);
    const pY = Number.parseInt(match3[0][2]);

    //console.log(aX, aY, bX, bY, pX, pY);

    // system of linear equations
    // px = i * aX + j * bX
    // py = i * aY + j * bY

    // https://www.geeksforgeeks.org/how-to-solve-equations-with-mathjs/#solving-nonlinear-equations

    const coefficients = [
      [aX, bX],
      [aY, bY],
    ];
    const constants = [pX, pY];
    const solutions = math.lusolve(coefficients, constants);
    //console.log(solutions);

    // const a = solutions[0][0];
    // const b = solutions[1][0];

    const s1 = solutions.at(0);
    const s2 = solutions.at(1);

    let a: number = 0;
    let b: number = 0;

    if (Array.isArray(s1) && Array.isArray(s2)) {
      a = s1[0] as number;
      b = s2[0] as number;
    }

    const epsilon = 0.0001;
    if (Math.abs(a - Math.round(a)) < epsilon && Math.abs(b - Math.round(b)) < epsilon) {
      // console.log("solution found!")
      // console.log(Math.round(a), Math.round(b))
      sum += 3 * Math.round(a) + 1 * Math.round(b);
    }
  }
  return sum;
}

export function problem13b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const lines = input.split("\n");
  let sum: number = 0;
  for (let i = 0; i < lines.length; i += 4) {
    const regex1 = /Button (A|B): X\+(\d+), Y\+(\d+)/g;
    const regex2 = /Prize: X=(\d+), Y=(\d+)/g;
    const match1 = [...lines[i].matchAll(regex1)];
    const match2 = [...lines[i + 1].matchAll(regex1)];
    const match3 = [...lines[i + 2].matchAll(regex2)];

    const aX = Number.parseInt(match1[0][2]);
    const aY = Number.parseInt(match1[0][3]);
    const bX = Number.parseInt(match2[0][2]);
    const bY = Number.parseInt(match2[0][3]);
    // add offsets to prizes
    const pX = Number.parseInt(match3[0][1]) + 10000000000000;
    const pY = Number.parseInt(match3[0][2]) + 10000000000000;

    //console.log(aX, aY, bX, bY, pX, pY);

    // system of linear equations
    // px = i * aX + j * bX
    // py = i * aY + j * bY

    // https://www.geeksforgeeks.org/how-to-solve-equations-with-mathjs/#solving-nonlinear-equations

    const coefficients = [
      [aX, bX],
      [aY, bY],
    ];
    const constants = [pX, pY];
    const solutions = math.lusolve(coefficients, constants);
    //console.log(solutions);

    const s1 = solutions.at(0);
    const s2 = solutions.at(1);

    let a: number = 0;
    let b: number = 0;

    if (Array.isArray(s1) && Array.isArray(s2)) {
      a = s1[0] as number;
      b = s2[0] as number;
    }

    const epsilon = 0.0001;
    if (Math.abs(a - Math.round(a)) < epsilon && Math.abs(b - Math.round(b)) < epsilon) {
      // console.log("solution found!")
      // console.log(Math.round(a), Math.round(b))
      sum += 3 * Math.round(a) + 1 * Math.round(b);
    }
  }
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem13a("inputs/13e.txt"));
  console.log(problem13b("inputs/13e.txt"));
  console.log("Real Inputs");
  console.log(problem13a("inputs/13.txt"));
  console.log(problem13b("inputs/13.txt"));
}

Deno.bench("problem13a", () => {
  problem13a("inputs/13.txt");
});

Deno.bench("problem13b", () => {
  problem13b("inputs/13.txt");
});
