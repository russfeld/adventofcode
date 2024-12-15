export function problem11a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: number[] = input.trim().split(" ").map((x) =>
    Number.parseInt(x)
  );
  let dict: Map<number, number> = new Map();
  for (let i = 0; i < array.length; i++) {
    dict.set(array[i], 1);
  }
  let sum: number = 0;
  for (let i = 0; i < 25; i++) {
    const new_dict: Map<number, number> = new Map();
    for (const [key, value] of dict) {
      const new_keys = update(key);
      for (let j = 0; j < new_keys.length; j++) {
        if (new_dict.has(new_keys[j])) {
          new_dict.set(new_keys[j], new_dict.get(new_keys[j])! + value);
        } else {
          new_dict.set(new_keys[j], value);
        }
      }
    }
    dict = new_dict;
  }
  for (const [_key, value] of dict) {
    sum += value;
  }
  return sum;
}

function update(x: number): number[] {
  if (x == 0) {
    return [1];
  }
  if ((Math.ceil(Math.log10(x + 1)) % 2) == 0) {
    const split = Math.ceil(Math.log10(x + 1)) / 2;
    return [Math.floor(x / Math.pow(10, split)), x % Math.pow(10, split)];
  } else {
    return [x * 2024];
  }
}

export function problem11b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: number[] = input.trim().split(" ").map((x) =>
    Number.parseInt(x)
  );
  let dict: Map<number, number> = new Map();
  for (let i = 0; i < array.length; i++) {
    dict.set(array[i], 1);
  }
  let sum: number = 0;
  for (let i = 0; i < 75; i++) {
    const new_dict: Map<number, number> = new Map();
    for (const [key, value] of dict) {
      const new_keys = update(key);
      for (let j = 0; j < new_keys.length; j++) {
        if (new_dict.has(new_keys[j])) {
          new_dict.set(new_keys[j], new_dict.get(new_keys[j])! + value);
        } else {
          new_dict.set(new_keys[j], value);
        }
      }
    }
    dict = new_dict;
  }
  for (const [_key, value] of dict) {
    sum += value;
  }
  return sum;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem11a("inputs/11e.txt"));
  console.log(problem11b("inputs/11e.txt"));
  console.log("Real Inputs");
  console.log(problem11a("inputs/11.txt"));
  console.log(problem11b("inputs/11.txt"));
}

Deno.bench("problem11a", () => {
  problem11a("inputs/11.txt");
});

Deno.bench("problem11b", () => {
  problem11b("inputs/11.txt");
});
