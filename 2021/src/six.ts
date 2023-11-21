export async function six_a() : Promise<number> {
  const file = Bun.file("inputs/six.txt");
  var fish : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const line of (await file.text()).split("\n")) {
    for(const val of line.split(',')){
      fish[parseInt(val)]++;
    }
  }

  for(var i = 0; i < 80; i++){
    fish = [fish[1], fish[2], fish[3], fish[4], fish[5], fish[6], fish[7] + fish[0], fish[8], fish[0]];
  }
  return fish.reduce((acc, val) => acc + val);
}

export async function six_b() : Promise<number> {
  const file = Bun.file("inputs/six.txt");
  var fish : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const line of (await file.text()).split("\n")) {
    for(const val of line.split(',')){
      fish[parseInt(val)]++;
    }
  }

  for(var i = 0; i < 256; i++){
    fish = [fish[1], fish[2], fish[3], fish[4], fish[5], fish[6], fish[7] + fish[0], fish[8], fish[0]];
  }
  return fish.reduce((acc, val) => acc + val);
}

console.log(await six_a());
console.log(await six_b());