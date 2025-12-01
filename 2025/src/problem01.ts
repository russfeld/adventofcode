export function problem01a(inputfile: string): number {
  return inputfile.length * 0;
}

export function problem01b(inputfile: string): number {
  return inputfile.length * 0;
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
