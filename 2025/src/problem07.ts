export function problem07a(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  let lines: Set<number> = new Set([input[0].indexOf("S")]);
  const len: number = input.length;
  let splits: number = 0;
  for (let i = 1; i < len; i++) {
    const new_lines: Set<number> = new Set();
    for (const line of lines) {
      if (input[i].charAt(line) == "^") {
        new_lines.add(line - 1);
        new_lines.add(line + 1);
        splits += 1;
      } else {
        new_lines.add(line);
      }
    }
    lines = new_lines;
  }
  return splits;
}

export function problem07b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  let lines: Map<number, number> = new Map();
  lines.set(input[0].indexOf("S"), 1);
  const len: number = input.length;
  for (let i = 1; i < len; i++) {
    const new_lines: Map<number, number> = new Map();
    for (const line of lines) {
      const loc = line[0];
      const count = line[1];
      if (input[i].charAt(loc) == "^") {
        const val = new_lines.get(loc - 1)
        if (val !== undefined) {
          new_lines.set(loc - 1, val + count);
        } else {
          new_lines.set(loc - 1, count);
        }
        const val2 = new_lines.get(loc + 1)
        if (val2 !== undefined) {
          new_lines.set(loc + 1, val2 + count);
        } else {
          new_lines.set(loc + 1, count);
        }
      } else {
        const val3 = new_lines.get(loc)
        if (val3 !== undefined) {
          new_lines.set(loc, val3 + count);
        } else {
          new_lines.set(loc, count);
        }
      }
    }
    lines = new_lines;
    // console.log(lines)
  }
  return lines.values().reduce((a, b) => a + b);
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem07a("inputs/07e.txt"));
  console.log(problem07b("inputs/07e.txt"));
  console.log("Real Inputs");
  console.log(problem07a("inputs/07.txt"));
  console.log(problem07b("inputs/07.txt"));
}

Deno.bench("problem07a", () => {
  problem07a("inputs/07.txt");
});

Deno.bench("problem07b", () => {
  problem07b("inputs/07.txt");
});
