import { min } from "mathjs";

function combo_operand(op: number, registers: { [key: string]: number }): number {
  switch (op) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return registers.a;
    case 5:
      return registers.b;
    case 6:
      return registers.c;
    case 7:
      console.log("RESERVED!");
      return -1;
  }
  return -1;
}

export function problem17a(inputfile: string): string {
  const input = Deno.readTextFileSync(inputfile);
  const regex = /^Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: ([\d,]+)$/;
  const [, a, b, c, program] = input.match(regex) as string[];
  const registers = { a: Number(a), b: Number(b), c: Number(c) };
  const instructions = program.split(",").map(Number);
  //console.log(registers, instructions);
  const out: number[] = [];
  let ip = 0;
  while (ip < instructions.length) {
    switch (instructions[ip]) {
      case 0:
        // adv instruction
        registers.a = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
      case 1:
        // bxl instruction
        registers.b = registers.b ^ instructions[ip + 1];
        ip += 2;
        break;
      case 2:
        // bst instruction
        registers.b = combo_operand(instructions[ip + 1], registers) % 8;
        ip += 2;
        break;
      case 3:
        // jnz instruction
        if (registers.a == 0) {
          ip += 2;
        } else {
          ip = instructions[ip + 1];
        }
        break;
      case 4:
        // bxc instruction
        registers.b = registers.b ^ registers.c;
        ip += 2;
        break;
      case 5:
        // out instruction
        out.push(combo_operand(instructions[ip + 1], registers) % 8);
        ip += 2;
        break;
      case 6:
        // bdv instruction
        registers.b = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
      case 7:
        registers.c = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
    }
  }
  //console.log(registers);
  return out.join(",");
}

function _to_base_8(n: number): string {
  let result = "";
  while (n > 0) {
    result = (n % 8).toString() + result;
    n = Math.trunc(n / 8);
  }
  return result;
}

function _positiveModulo(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}

function simulate(instructions: number[], a: number, b: number, c: number, out: number): boolean {
  const registers = { a: a, b: b, c: c };
  let ip = 0;
  while (ip < instructions.length) {
    let to_out: number = 0;
    switch (instructions[ip]) {
      case 0:
        // adv instruction
        registers.a = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
      case 1:
        // bxl instruction
        registers.b = registers.b ^ instructions[ip + 1];
        ip += 2;
        break;
      case 2:
        // bst instruction
        //registers.b = combo_operand(instructions[ip + 1], registers) % 8;
        registers.b = _positiveModulo(combo_operand(instructions[ip + 1], registers), 8);
        ip += 2;
        break;
      case 3:
        // jnz instruction
        return false;
      case 4:
        // bxc instruction
        registers.b = registers.b ^ registers.c;
        ip += 2;
        break;
      case 5:
        // out instruction
        //to_out = combo_operand(instructions[ip + 1], registers) % 8;
        to_out = _positiveModulo(combo_operand(instructions[ip + 1], registers), 8);
        //console.log(a, to_out);
        if (to_out == out) {
          return true;
        } else {
          return false;
        }
      case 6:
        // bdv instruction
        registers.b = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
      case 7:
        registers.c = Math.trunc(registers.a / (2 ** combo_operand(instructions[ip + 1], registers)));
        ip += 2;
        break;
    }
  }
  return false;
}

export function problem17b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const regex = /^Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: ([\d,]+)$/;
  const [, a, b, c, program] = input.match(regex) as string[];
  const registers = { a: Number(a), b: Number(b), c: Number(c) };
  const instructions = program.split(",").map(Number);
  //console.log(registers, instructions);
  let out_counter = instructions.length - 1;
  let possibilities: number[] = [0];
  while (out_counter >= 0) {
    const new_possibilities: number[] = [];
    for (let p of possibilities) {
      p = p * 8;
      for (let i = 0; i < 8; i++) {
        if (simulate(instructions, p + i, registers.b, registers.c, instructions[out_counter])) {
          new_possibilities.push(p + i);
        }
      }
    }
    //console.log(out_counter, new_possibilities);
    possibilities = new_possibilities;
    out_counter--;
  }
  return min(possibilities);
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem17a("inputs/17e.txt"));
  console.log(problem17b("inputs/17e2.txt"));
  console.log("Real Inputs");
  console.log(problem17a("inputs/17.txt"));
  console.log(problem17b("inputs/17.txt"));
}

Deno.bench("problem17a", () => {
  problem17a("inputs/17.txt");
});

Deno.bench("problem17b", () => {
  problem17b("inputs/17.txt");
});
