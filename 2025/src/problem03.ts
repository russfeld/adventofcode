export function problem03a(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const banks: string[] = input.split("\n");
  let sum: number = 0;
  for (const bank of banks) {
    const len = bank.length;
    let max1: number = 0;
    let max2: number = 0;
    for (let i = 0; i < len - 1; i++) {
      const bat: number = Number.parseInt(bank[i]);
      if (bat > max1) {
        max1 = bat;
        max2 = 0;
      } else if (bat > max2) {
        max2 = bat;
      }
    }
    const bat: number = Number.parseInt(bank[len - 1]);
    if (bat > max2) {
      max2 = bat;
    }
    // console.log(bank)
    // console.log(max1 * 10 + max2);
    sum += max1 * 10 + max2;
  }
  return sum;
}

export function problem03b(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const banks: string[] = input.split("\n");
  let sum: number = 0;
  for (const bank of banks) {
    const output: string[] = [
      bank[0],
      bank[1],
      bank[2],
      bank[3],
      bank[4],
      bank[5],
      bank[6],
      bank[7],
      bank[8],
      bank[9],
      bank[10],
      bank[11],
    ];
    const len = bank.length;
    let cooldown = 12;
    for (let i = 1; i < len; i++) {
      if (cooldown > 0) {
        cooldown = cooldown - 1;
      }
      const bat = bank[i];
      for (let j = len - i >= 12 ? 0 : 12 - len + i; j < 12 - cooldown; j++) {
        if (bat > output[j]) {
          // console.log(output.join(""))
          // console.log(`Placing ${bat} from location ${i} at spot ${j}`)
          output[j] = bat;
          cooldown = 12 - j;
          // console.log(output.join(""))
          j++;
          for (let offset = 1; j < 12; j++, offset++) {
            output[j] = bank[i + offset];
          }
          // console.log(`Resetting other values`)
          // console.log(output.join(""))
          break;
        }
      }
    }
    // console.log(output.join(""))
    sum += Number.parseInt(output.join(""));
  }
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
