export function problem01a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[] = input.split("\n");
  let dial: number = 50;
  let count: number = 0;
  for (const line of array){
    const dir: string = line.charAt(0)
    const turns: number = Number.parseInt(line.substring(1))
    if (dir == "L") {
      dial = mod((dial - turns), 100)
    } else {
      dial = mod((dial + turns), 100)
    }
    // console.log(`Turned ${dir} to ${dial}`)
    if (dial == 0) {
      count += 1;
      // console.log(`Password ${count}`)
    }
  }
  return count;
}

export function problem01b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[] = input.split("\n");
  let dial: number = 50;
  let count: number = 0;
  for (const line of array){
    const dir: string = line.charAt(0)
    const turns: number = Number.parseInt(line.substring(1))
    if (dir == "L") {
      // starting on 0 gets double-counted when going left
      if (dial == 0) {
        count -= 1;
      }
      dial = dial - turns;
      count = count + Math.trunc(((dial - 100) / -100))
      dial = mod(dial, 100)
    } else {
      dial = dial + turns;
      count = count + Math.trunc((dial / 100))
      dial = mod(dial, 100)
    }
    // console.log(`Turned ${dir} to ${dial}`)
    // console.log(`Clicks ${count}`)
  }
  return count;
}

/**
 * Because JavaScript implements modulo as a remainder instead of the 
 * mathematically correct operation, negative numbers will not work properly.
 * 
 * @see https://stackoverflow.com/a/4467559
 * 
 * 
 * @param a the dividend
 * @param b the divisor
 * @returns the proper modulo result of dividend % divisor
 */
function mod(a: number, b: number): number {
  return ((a % b) + b) % b
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
