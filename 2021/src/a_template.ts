export async function four_a() : Promise<number> {
  const file = Bun.file("inputs/four.txt");

  for (const line of (await file.text()).split("\n")) {

  }

  return 0;
}

export async function four_b() : Promise<number> {
  const file = Bun.file("inputs/two.txt");

  for (const line of (await file.text()).split("\n")) {
    
  }

  return 0;
}

console.log(await four_b());
console.log(await four_b());