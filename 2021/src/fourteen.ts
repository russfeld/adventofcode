export async function fourteen_a(): Promise<number> {
  const file = Bun.file("inputs/fourteen.txt");

  let polymer: string = "";
  const rules: Map<string, string> = new Map();

  for (const line of (await file.text()).split("\n")) {
    if (polymer.length == 0) {
      polymer = line.trim();
    } else if (line.trim().length == 0) {
      continue;
    } else {
      const parts: string[] = line.trim().split(" -> ");
      rules.set(parts[0], parts[1]);
    }
  }

  for (let i = 0; i < 10; i++) {
    let new_poly: string = "";
    for (let j = 0; j < polymer.length - 1; j++) {
      new_poly += polymer[j] + rules.get(polymer[j] + polymer[j + 1]);
    }
    new_poly += polymer[polymer.length - 1];
    polymer = new_poly;
  }

  const counts: Map<string, number> = new Map();
  for (const char of polymer) {
    if (counts.has(char)) {
      counts.set(char, (counts.get(char) as number) + 1);
    } else {
      counts.set(char, 1);
    }
  }

  const count_array: number[] = [];
  for (const pair of counts) {
    count_array.push(pair[1]);
  }

  count_array.sort((a, b) => a - b);

  return count_array[count_array.length - 1] - count_array[0];
}

export async function fourteen_b(): Promise<number> {
  const file = Bun.file("inputs/fourteen.txt");

  let polymer: string = "";
  let polymer_pairs: Map<string, number> = new Map();
  const rules: Map<string, string> = new Map();
  let first: string = "";
  let last: string = "";

  for (const line of (await file.text()).split("\n")) {
    if (polymer.length == 0) {
      polymer = line.trim();
      first = polymer[0];
      last = polymer[polymer.length - 1];
    } else if (line.trim().length == 0) {
      continue;
    } else {
      const parts: string[] = line.trim().split(" -> ");
      rules.set(parts[0], parts[1]);
    }
  }

  for (let j = 0; j < polymer.length - 1; j++) {
    const pair: string = polymer[j] + polymer[j + 1];
    if (polymer_pairs.has(pair)) {
      polymer_pairs.set(pair, (polymer_pairs.get(pair) as number) + 1);
    } else {
      polymer_pairs.set(pair, 1);
    }
  }

  // console.log(polymer_pairs);

  for (let i = 0; i < 40; i++) {
    const new_pairs: Map<string, number> = new Map();
    for (const pair of polymer_pairs) {
      const char = rules.get(pair[0]) as string;
      const pair1 = pair[0][0] + char;
      const pair2 = char + pair[0][1];
      if (new_pairs.has(pair1)) {
        new_pairs.set(pair1, (new_pairs.get(pair1) as number) + pair[1]);
      } else {
        new_pairs.set(pair1, pair[1]);
      }
      if (new_pairs.has(pair2)) {
        new_pairs.set(pair2, (new_pairs.get(pair2) as number) + pair[1]);
      } else {
        new_pairs.set(pair2, pair[1]);
      }
    }
    polymer_pairs = new_pairs;
    // console.log(polymer_pairs);
  }

  const counts: Map<string, number> = new Map();
  for (const pair of polymer_pairs) {
    if (counts.has(pair[0][0])) {
      counts.set(pair[0][0], (counts.get(pair[0][0]) as number) + pair[1]);
    } else {
      counts.set(pair[0][0], pair[1]);
    }
    if (counts.has(pair[0][1])) {
      counts.set(pair[0][1], (counts.get(pair[0][1]) as number) + pair[1]);
    } else {
      counts.set(pair[0][1], pair[1]);
    }
  }

  counts.set(first, (counts.get(first) as number) + 1);
  counts.set(last, (counts.get(last) as number) + 1);

  // console.log(counts);

  const count_array: number[] = [];
  for (const pair of counts) {
    count_array.push(pair[1] / 2);
  }

  count_array.sort((a, b) => a - b);

  return count_array[count_array.length - 1] - count_array[0];

  return 0;
}

console.log(await fourteen_a());
console.log(await fourteen_b());
