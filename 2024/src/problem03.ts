export function problem03a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const regex = /mul\((\d+),(\d+)\)/gi;
  const found: RegExpStringIterator<RegExpExecArray> | null = input.matchAll(
    regex,
  );
  if (found === null) {
    return 0;
  }
  let sum: number = 0;
  found.forEach((line) => {
    sum += Number.parseInt(line[1]) * Number.parseInt(line[2]);
  });
  return sum;
}

export function problem03b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const keep = input.split(/do\(\)/).map((block) => {
    return block.substring(
      0,
      block.indexOf("don't()") === -1 ? block.length : block.indexOf("don't()"),
    );
  });
  const regex = /mul\((\d+),(\d+)\)/gi;
  let sum: number = 0;
  keep.forEach((block) => {
    const found: RegExpStringIterator<RegExpExecArray> | null = block.matchAll(
      regex,
    );
    if (found === null) {
      return 0;
    }
    found.forEach((line) => {
      sum += Number.parseInt(line[1]) * Number.parseInt(line[2]);
    });
  });
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem03a("inputs/03e.txt"));
  console.log(problem03b("inputs/03e.txt"));
  console.log("Real Inputs");
  console.log(problem03a("inputs/03.txt"));
  console.log(problem03b("inputs/03.txt"));
}

Deno.bench("problem03a", () => {
  problem03a("inputs/03.txt");
});

Deno.bench("problem03b", () => {
  problem03b("inputs/03.txt");
});
