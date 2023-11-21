export async function seven_a(): Promise<number> {
  const file = Bun.file("inputs/seven.txt");
  let crabs: number[] = [];

  for (const line of (await file.text()).split("\n")) {
    crabs = line.trim().split(",").map(Number);
  }

  let min = crabs.reduce((acc, value) => acc + value);

  for (let i = 1; i < 2000; i++) {
    crabs = crabs.map((item) => item - 1);
    const val = crabs.reduce((acc, value) => acc + Math.abs(value));
    if (val < min) {
      min = val;
    }
  }

  return min;
}

export async function seven_b(): Promise<number> {
  const file = Bun.file("inputs/seven.txt");
  let crabs: number[] = [];

  for (const line of (await file.text()).split("\n")) {
    crabs = line.trim().split(",").map(Number);
  }

  let min = crabs.reduce((acc, value) => acc + (value * (value + 1)) / 2);

  for (let i = 1; i < 2000; i++) {
    crabs = crabs.map((item) => item - 1);
    const vals = crabs.map(
      (item) => (Math.abs(item) * (Math.abs(item) + 1)) / 2,
    );
    const val = vals.reduce((acc, item) => acc + item);
    if (val < min) {
      min = val;
      // console.log(crabs);
      // console.log(vals);
      // console.log(min);
      // console.log(i);
    }
  }

  return min;
}

console.log(await seven_a());
console.log(await seven_b());
