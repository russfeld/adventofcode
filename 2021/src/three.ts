export async function three_a() : Promise<number> {
  const file = Bun.file("inputs/three.txt");
  var counts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var total: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const values: number[] = line.split('').map(Number);
    counts = counts.map((item, index) => item + values[index]);
    total += 1;  
    // console.log(counts);  
  }

  // console.log(counts);
  // console.log(total);

  var gamma: string = "";
  var epsilon: string = "";

  for (const value of counts) {
    if (value > total / 2){
      gamma = gamma + "1";
      epsilon = epsilon + "0";
    } else {
      gamma = gamma + "0";
      epsilon = epsilon + "1";
    }
  }

  // console.log(parseInt(gamma, 2))
  // console.log(parseInt(epsilon, 2))

  const power = parseInt(gamma, 2) * parseInt(epsilon, 2);

  return power
}

export async function three_b() : Promise<number> {
  const file = Bun.file("inputs/three.txt");


  for (const line of (await file.text()).split("\n")) {
    

  }

  return 0;
}

console.log(await three_a());
console.log(await three_b());