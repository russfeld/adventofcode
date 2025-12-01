export function problem01a(inputfile: string): number {
  const numbers = Deno.readTextFileSync(inputfile)
    .split("\n")
    .map(Number)
  let solution: number = 0
  numbers.forEach((num, index) => {
    numbers.forEach((num2, index2) => {
      if (index !== index2 && num + num2 === 2020) {
        // console.log(`Found: ${num} + ${num2} = 2020`);
        solution = num * num2;
      }
    });
  });
  return solution;
}

export function problem01b(inputfile: string): number {
  const numbers = Deno.readTextFileSync(inputfile)
    .split("\n")
    .map(Number);
  let solution: number = 0;
  numbers.forEach((num, index) => {
    numbers.forEach((num2, index2) => {
      if (index !== index2) {
        numbers.forEach((num3, index3) => {
          if (index !== index3 && index2 !== index3 && num + num2 + num3 === 2020) {
            // console.log(`Found: ${num} + ${num2} + ${num3} = 2020`);
            solution = num * num2 * num3;
          }
        });
      }
    });
  });
  return solution;
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
