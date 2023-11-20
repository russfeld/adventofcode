export async function two_a() : Promise<number> {
  const file = Bun.file("inputs/two.txt");

  var horiz: number = 0;
  var vert: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.split(" ");
    var value: number = parseInt(parts[1]);
    if (parts[0] == "forward"){
      horiz += value;
    }else if (parts[0] == "down"){
      vert += value;
    }else if (parts[0] == "up"){
      vert -= value;
    }
  }

  return horiz * vert;
}

export async function two_b() : Promise<number> {
  const file = Bun.file("inputs/two.txt");

  var horiz: number = 0;
  var vert: number = 0;
  var aim: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.split(" ");
    var value: number = parseInt(parts[1]);
    if (parts[0] == "forward"){
      horiz += value;
      vert += aim * value;
    }else if (parts[0] == "down"){
      aim += value;
    }else if (parts[0] == "up"){
      aim -= value;
    }
  }

  return horiz * vert;
}

console.log(await two_a());
console.log(await two_b());