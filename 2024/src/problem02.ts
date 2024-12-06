export function problem02a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const readings: number[][] = [];
  input.split("\n").forEach((line) => {
    readings.push(line.split(/\s+/).map((x) => Number.parseInt(x)));
  });
  let sum: number = 0;
  readings.forEach((reading) => {
    if (is_valid(reading)){
      sum++;
    }
  });
  return sum
}

function is_valid(reading: number[]): boolean {
  let dir: number = 0;
  for (let i = 0; i < reading.length - 1; i++) {
    const diff = reading[i] - reading[i + 1];
    if (diff == 0 || diff > 3 || diff < -3){
      return false;
    }
    if (dir == 0){
      dir = diff < 0 ? -1 : 1;
    } else if ((dir < 0 && diff > 0) || (dir > 0 && diff < 0)){
      return false;
    }
  }
  return true;
}

export function problem02b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const readings: number[][] = [];
  input.split("\n").forEach((line) => {
    readings.push(line.split(/\s+/).map((x) => Number.parseInt(x)));
  });
  let sum: number = 0;
  readings.forEach((reading) => {
    let ok: boolean = false;
    for (let j = -1; j < reading.length; j++) {
      let subset: number[] = [];
      if (j != -1){
        subset = reading.slice(0, j).concat(reading.slice(j+1));
      } else {
        subset = reading;
      }
      if(is_valid(subset)){
        ok = true;
        break;
      }
    }
    if (ok){
      sum++;
    }
  });
  return sum
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