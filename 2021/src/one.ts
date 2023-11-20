export async function one_a() : Promise<number> {
  const file = Bun.file("inputs/one.txt");

  var last: number = 0;
  var count: number = 0;

  for (const line of (await file.text()).split("\n")) {
    var value: number = parseInt(line);
    if (last < value) {
      count += 1;
    }
    last = value;
  }

  return count - 1;
}

export async function one_b() : Promise<number> {
  const file = Bun.file("inputs/one.txt");

  var last_1: number = 0;
  var last_2: number = 0;
  var last_3: number = 0;
  var count: number = 0;

  for (const line of (await file.text()).split("\n")) {
    var value: number = parseInt(line);
    if (last_1 == 0){
      last_1 = value;
    }else if (last_2 == 0){
      last_2 = value;
    }else if (last_3 == 0){
      last_3 = value;
    }else {
      var last_sum: number = last_1 + last_2 + last_3;
      var new_sum: number = last_2 + last_3 + value;
      if (last_sum < new_sum) {
        count += 1;
      }
      last_1 = last_2;
      last_2 = last_3;
      last_3 = value;
    }
  }

  return count;
}

console.log(await one_a());
console.log(await one_b());