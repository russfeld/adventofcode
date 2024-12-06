export function problem01a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const first: number[] = [];
  const second: number[] = [];
  input.split("\n").forEach((line) => {
    const nums = line.split(/\s+/).map((x) => Number.parseInt(x));
    first.push(nums[0]);
    second.push(nums[1]);
  });
  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);
  let sum: number = 0;
  for (let i = 0; i < first.length; i++) {
    sum += Math.abs(first[i] - second[i]);
  }
  return sum;
}

export function problem01b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const first: number[] = [];
  const second: number[] = [];
  input.split("\n").forEach((line) => {
    const nums = line.split(/\s+/).map((x) => Number.parseInt(x));
    first.push(nums[0]);
    second.push(nums[1]);
  });
  let sum: number = 0;
  first.forEach((item) => {
    const count: number = second.filter((x) => x === item).length;
    sum += item * count;
  });
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem01a("inputs/01e.txt"));
  console.log(problem01b("inputs/01e.txt"));
  console.log("Real Inputs");
  console.log(problem01a("inputs/01.txt"));
  console.log(problem01b("inputs/01.txt"));
}

Deno.bench("problem01a", () => {
  problem01a("inputs/01.txt");
});

Deno.bench("problem01b", () => {
  problem01b("inputs/01.txt");
});