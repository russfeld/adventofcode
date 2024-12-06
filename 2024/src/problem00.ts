export function problem00a(inputfile: string): number {
  return 0;
}

export function problem00b(inputfile: string): number {
  return 0;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem00a("inputs/00e.txt"));
  console.log(problem00b("inputs/00e.txt"));
  console.log("Real Inputs");
  console.log(problem00a("inputs/00.txt"));
  console.log(problem00b("inputs/00.txt"));
}

Deno.bench("problem00a", () => {
  problem00a("inputs/00.txt");
});

Deno.bench("problem00b", () => {
  problem00b("inputs/00.txt");
});