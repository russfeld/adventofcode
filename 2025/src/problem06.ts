export function problem06a(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const len = input.length;
  const symbols: string[] = input[len - 1].trim().split(/\s+/);
  const len_numbers = symbols.length;
  const answers: number[] = symbols.map((x) => x == "+" ? 0 : 1);
  for (let i = 0; i < len - 1; i++) {
    const numbers = input[i].trim().split(/\s+/).map((x) => Number.parseInt(x));
    for (let j = 0; j < len_numbers; j++) {
      if (symbols[j] == "+") {
        answers[j] += numbers[j];
      } else {
        answers[j] *= numbers[j];
      }
    }
    // console.log(answers)
  }
  const sum = answers.reduce((a, b) => a + b);
  return sum;
}

export function problem06b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const len = input.length;
  const symbols: string[] = input[len - 1].trim().split(/\s+/);
  const answers: number[] = symbols.map((x) => x == "+" ? 0 : 1);
  const len_input = input[0].length;
  let s_index = 0;
  for (let j = 0; j < len_input; j++) {
    let num: string = "";
    for (let i = 0; i < len - 1; i++) {
      num += input[i][j];
    }
    if (num.trim() == "") {
      // console.log(answers)
      s_index += 1;
    } else {
      const value = Number.parseInt(num);
      if (symbols[s_index] == "+") {
        answers[s_index] += value;
      } else {
        answers[s_index] *= value;
      }
    }
  }
  const sum = answers.reduce((a, b) => a + b);
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem06a("inputs/06e.txt"));
  console.log(problem06b("inputs/06e.txt"));
  console.log("Real Inputs");
  console.log(problem06a("inputs/06.txt"));
  console.log(problem06b("inputs/06.txt"));
}

Deno.bench("problem06a", () => {
  problem06a("inputs/06.txt");
});

Deno.bench("problem06b", () => {
  problem06b("inputs/06.txt");
});
