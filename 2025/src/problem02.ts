export function problem02a(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const ranges: string[] = input.split(",");
  const array: number[][] = ranges.map((x) =>
    x.split("-").map((y) => Number.parseInt(y))
  );
  let sum: number = 0;
  for (const range of array) {
    for (let i = range[0]; i <= range[1]; i++) {
      const str = "" + i;
      if (str.length % 2 == 0) {
        const half: number = str.length / 2;
        if (str.startsWith(str.substring(half))) {
          sum += i;
        }
      }
    }
  }
  return sum;
}

export function problem02b(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const ranges: string[] = input.split(",");
  const array: number[][] = ranges.map((x) =>
    x.split("-").map((y) => Number.parseInt(y))
  );
  let sum: number = 0;
  const re = /^([0-9]+)\1+$/gm;
  for (const range of array) {
    for (let i = range[0]; i <= range[1]; i++) {
      const str = "" + i;
      if (re.exec(str) != null) {
        sum += i;
      }
    }
  }
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem02a("inputs/02e.txt"));
  console.log(problem02b("inputs/02e.txt"));
  console.log("Real Inputs");
  console.log(problem02a("inputs/02.txt"));
  console.log(problem02b("inputs/02.txt"));
}

Deno.bench("problem02a", () => {
  problem02a("inputs/02.txt");
});

Deno.bench("problem02b", () => {
  problem02b("inputs/02.txt");
});
