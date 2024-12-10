export function problem08a(inputfile: string): number {
  return inputfile.length * 0;
}

export function problem08b(inputfile: string): number {
  return inputfile.length * 0;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem08a("inputs/08e.txt"));
  console.log(problem08b("inputs/08e.txt"));
  console.log("Real Inputs");
  console.log(problem08a("inputs/08.txt"));
  console.log(problem08b("inputs/08.txt"));
}

Deno.bench("problem08a", () => {
  problem08a("inputs/08.txt");
});

Deno.bench("problem08b", () => {
  problem08b("inputs/08.txt");
});
