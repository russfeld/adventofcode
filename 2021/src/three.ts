import { listen } from "bun";

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
  var total: number = 0;
  var values: string[] = (await file.text()).split("\n")
  var values2: string[] = JSON.parse(JSON.stringify(values)); 

  for (const index of Array(12).keys()) {
    const count: number = values.reduce((accumulator, value) => accumulator + parseInt(value[index]), 0);
    if (count >= values.length / 2){
      values = values.filter((element) => element[index] == "1");
    } else {
      values = values.filter((element) => element[index] == "0");
    }
    if (values.length == 1){
      break;
    }
  }

  //console.log(values)

  for (const index of Array(12).keys()) {
    const count: number = values2.reduce((accumulator, value) => accumulator + parseInt(value[index]), 0);
    if (count >= values2.length / 2){
      values2 = values2.filter((element) => element[index] == "0");
    } else {
      values2 = values2.filter((element) => element[index] == "1");
    }
    if(values2.length == 1){
      break;
    }
  }

  //console.log(values2)

  const power = parseInt(values[0], 2) * parseInt(values2[0], 2);

  return power
}

console.log(await three_a());
console.log(await three_b());