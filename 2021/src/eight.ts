export async function eight_a(): Promise<number> {
  const file = Bun.file("inputs/eight.txt");
  let count: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split("|");
    // const digits = parts[0].trim().split(" ");
    const code: string[] = parts[1].trim().split(" ");
    for (const digit of code) {
      if (
        digit.length == 2 ||
        digit.length == 3 ||
        digit.length == 4 ||
        digit.length == 7
      ) {
        count++;
      }
    }
  }

  return count;
}

export async function eight_b(): Promise<number> {
  const file = Bun.file("inputs/eight.txt");
  let sum: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split("|");
    let digits: string[] = parts[0].trim().split(" ");
    digits = digits.map((elem) => elem.split("").sort().join(""));
    const key: string[] = [];
    for (const part of digits) {
      if (part.length == 2) {
        key[1] = part;
      } else if (part.length == 3) {
        key[7] = part;
      } else if (part.length == 4) {
        key[4] = part;
      } else if (part.length == 7) {
        key[8] = part;
      }
    }
    for (const part of digits) {
      if (part.length == 6) {
        if (similar(part, key[1]) != 2) {
          key[6] = part;
        } else if (similar(part, key[4]) == 4) {
          key[9] = part;
        } else {
          key[0] = part;
        }
      }
      if (part.length == 5) {
        if (similar(part, key[1]) == 2) {
          key[3] = part;
        } else if (similar(part, key[4]) == 3) {
          key[5] = part;
        } else {
          key[2] = part;
        }
      }
    }

    let code: string[] = parts[1].trim().split(" ");
    code = code.map((elem) => elem.split("").sort().join(""));
    let value: number = 0;
    for (const digit of code) {
      const index = key.indexOf(digit);
      value = value * 10 + index;
    }
    sum = sum + value;
  }

  return sum;
}

function similar(one: string, two: string): number {
  //console.log(one + " " + two);
  let count: number = 0;
  for (const char of one) {
    if (two.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(await eight_a());
console.log(await eight_b());
