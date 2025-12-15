import { Constraint, Model, solve } from "yalps";

export function problem10a(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  let count: number = 0;
  let index: number = 0;
  for (const line of input) {
    const splits = line.split(" ");
    // Represent lights and buttons as a single binary value each, so I can use bitwise operators to press buttongs
    const lights: number = splits[0].slice(1, -1).split("").reduce(
      (a, b, i) => a | (b == "#" ? 1 : 0) << i,
      0,
    );
    const buttons: number[] = splits.slice(1, -1).map((x) =>
      x.slice(1, -1).split(",").reduce(
        (a, b) => a | (1 << Number.parseInt(b)),
        0,
      )
    );
    // console.log(lights)
    // console.log(buttons)
    const queue: State[] = [new State(0)];
    const tried: Set<number> = new Set();
    while (queue.length > 0) {
      const s = queue.shift();
      if (s) {
        let found: boolean = false;
        const curr = s.lights;
        for (const b of buttons) {
          const test = curr ^ b;
          if (test == lights) {
            found = true;
            break;
          } else {
            if (!tried.has(test)) {
              // Memoize the states to avoid duplicates, otherwise it will be really slow
              queue.push(new State(test, s.count + 1));
              tried.add(test);
            }
          }
        }
        if (found) {
          // console.log(`${index} : ${s.count + 1}`)
          count += s.count + 1;
          index += 1;
          break;
        }
      }
    }
  }
  return count;
}

class State {
  constructor(public lights: number, public count: number = 0) {
  }
}

export function problem10b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  let count: number = 0;
  for (const line of input) {
    const splits = line.split(" ");
    const joltage: number[] = splits[splits.length - 1].slice(1, -1).split(",")
      .map((x) => Number.parseInt(x));
    const buttons: number[][] = splits.slice(1, -1).map((x) =>
      x.slice(1, -1).split(",").reduce((a, b) => {
        a[Number.parseInt(b)] = 1;
        return a;
      }, Array(joltage.length).fill(0))
    );
    // console.log(joltage)
    // console.log(buttons)

    // Uses YALPS for integer solving: https://github.com/IanManske/YALPS
    const constraints = new Map<string, Constraint>();
    for (let i = 0; i < joltage.length; i++) {
      constraints.set("light" + i, { equal: joltage[i] });
    }
    const variables = new Map<string, Map<string, number>>();
    for (let i = 0; i < buttons.length; i++) {
      const items = new Map<string, number>();
      for (let j = 0; j < buttons[i].length; j++) {
        if (buttons[i][j] == 1) {
          items.set("light" + j, 1);
        }
      }
      items.set("presses", 1);
      variables.set("button" + i, items);
    }
    const theModel: Model = {
      direction: "minimize",
      objective: "presses",
      constraints: constraints,
      variables: variables,
      integers: true,
    };
    const solution = solve(theModel);
    count += solution.result;
  }
  return count;
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
