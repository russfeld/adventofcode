export async function ten_a(): Promise<number> {
  const file = Bun.file("inputs/ten.txt");
  const opens: string[] = ["(", "[", "{", "<"];
  let score: number = 0;

  for (const line of (await file.text()).split("\n")) {
    const stack: string[] = [];
    for (const char of line) {
      if (opens.includes(char)) {
        stack.push(char);
      } else {
        if (!match(stack.pop() as string, char)) {
          score += points(char);
          break;
        }
      }
    }
  }

  return score;
}

function match(open: string, close: string): boolean {
  if (open == "{" && close == "}") {
    return true;
  }
  if (open == "(" && close == ")") {
    return true;
  }
  if (open == "[" && close == "]") {
    return true;
  }
  if (open == "<" && close == ">") {
    return true;
  }
  return false;
}

function points(char: string): number {
  if (char == ")") {
    return 3;
  }
  if (char == "]") {
    return 57;
  }
  if (char == "}") {
    return 1197;
  }
  if (char == ">") {
    return 25137;
  }
  return -1;
}

export async function ten_b(): Promise<number> {
  const file = Bun.file("inputs/ten.txt");
  const opens: string[] = ["(", "[", "{", "<"];
  let scores: number[] = [];

  for (const line of (await file.text()).split("\n")) {
    const stack: string[] = [];
    let complete: boolean = true;
    for (const char of line) {
      if (opens.includes(char)) {
        stack.push(char);
      } else {
        if (!match(stack.pop() as string, char)) {
          complete = false;
          break;
        }
      }
    }
    if (complete) {
      let score: number = 0;
      while (stack.length > 0) {
        const complete = stack.pop() as string;
        score = score * 5 + value(complete);
      }
      scores.push(score);
    }
  }

  scores = scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
}

function value(char: string): number {
  if (char == "(") {
    return 1;
  }
  if (char == "[") {
    return 2;
  }
  if (char == "{") {
    return 3;
  }
  if (char == "<") {
    return 4;
  }
  return -1;
}

console.log(await ten_a());
console.log(await ten_b());
