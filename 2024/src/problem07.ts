export function problem07a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  let sum: number = 0;
  for (const line of input.split("\n")) {
    const sections = line.split(":");
    const total = Number.parseInt(sections[0]);
    const values = sections[1].trim().split(" ").map((x) => Number.parseInt(x));
    let totals: number[] = [values[0]];
    for (let i = 1; i < values.length; i++) {
      const newtotals: number[] = [];
      for (const total of totals) {
        newtotals.push(total + values[i]);
        newtotals.push(total * values[i]);
      }
      totals = newtotals;
    }
    sum += totals.some((x) => x === total) ? total : 0;
  }
  return sum;
}

export function problem07b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  let sum: number = 0;
  for (const line of input.split("\n")) {
    const sections = line.split(":");
    const total = Number.parseInt(sections[0]);
    const values = sections[1].trim().split(" ").map((x) => Number.parseInt(x));
    let totals: number[] = [values[0]];
    for (let i = 1; i < values.length; i++) {
      const newtotals: number[] = [];
      for (const total of totals) {
        newtotals.push(total + values[i]);
        newtotals.push(total * values[i]);
        newtotals.push(Number.parseInt("" + total + values[i]));
      }
      totals = newtotals.filter((x) => x <= total);
    }
    sum += totals.some((x) => x === total) ? total : 0;
  }
  return sum;
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
