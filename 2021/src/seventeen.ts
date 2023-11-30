export async function seventeen_a(): Promise<number> {
  const file = Bun.file("inputs/seventeen_test.txt");

  let x_min: number = 0;
  let x_max: number = 0;
  let y_min: number = 0;
  let y_max: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.split(" ");
    let x_part = parts[2].substring(2);
    x_part = x_part.substring(0, x_part.length - 1);
    const x_splits = x_part.split("..");
    x_min = parseInt(x_splits[0]);
    x_max = parseInt(x_splits[1]);
    const y_part = parts[3].substring(2);
    const y_splits = y_part.split("..");
    y_min = parseInt(y_splits[0]);
    y_max = parseInt(y_splits[1]);
  }

  let x: number = 0;
  let i: number = 0;
  while (x < x_min) {
    i++;
    x = x + i;
  }

  console.log(i);

  

  return 0;
}

export async function seventeen_b(): Promise<number> {
  const file = Bun.file("inputs/seventeen.txt");

  let x_min: number = 0;
  let x_max: number = 0;
  let y_min: number = 0;
  let y_max: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.split(" ");
    let x_part = parts[2].substring(2);
    x_part = x_part.substring(0, x_part.length - 1);
    const x_splits = x_part.split("..");
    x_min = parseInt(x_splits[0]);
    x_max = parseInt(x_splits[1]);
    const y_part = parts[3].substring(2);
    const y_splits = y_part.split("..");
    y_min = parseInt(y_splits[0]);
    y_max = parseInt(y_splits[1]);
  }

  return 0;
}

console.log(await seventeen_a());
console.log(await seventeen_b());
