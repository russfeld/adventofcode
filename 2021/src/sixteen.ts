interface packet {
  version: number;
  type_id: number;
  value: number;
  operands: packet[];
  remaining: string;
}

const convert: object = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

export async function sixteen_a(): Promise<number> {
  const file = Bun.file("inputs/sixteen.txt");
  let binary: string = "";

  for (let line of (await file.text()).split("\n")) {
    line = line.trim();
    for (const char of line) {
      binary += convert[char] as string;
    }
    //binary = parseInt(line.trim(), 16).toString(2);
  }

  const parsed: packet = parse_packet(binary);

  // print_packets(parsed);

  return sum_versions(parsed);
}

function parse_packet(binary: string): packet {
  // console.log(binary);
  const version: number = parseInt(binary.substring(0, 3), 2);
  binary = binary.substring(3);
  const id: number = parseInt(binary.substring(0, 3), 2);
  binary = binary.substring(3);
  if (id == 4) {
    let first: string = binary.substring(0, 1);
    binary = binary.substring(1);
    let value: string = "";
    while (first == "1") {
      value = value + binary.substring(0, 4);
      binary = binary.substring(4);
      first = binary.substring(0, 1);
      binary = binary.substring(1);
    }
    value = value + binary.substring(0, 4);
    binary = binary.substring(4);
    return {
      version: version,
      type_id: id,
      value: parseInt(value, 2),
      operands: [],
      remaining: binary,
    };
  } else {
    const length_type: number = parseInt(binary.substring(0, 1), 2);
    binary = binary.substring(1);
    if (length_type == 0) {
      // 15 bits total length of sub packets
      const length: number = parseInt(binary.substring(0, 15), 2);
      binary = binary.substring(15);
      let remaining = binary.substring(0, length);
      const parsed: packet = {
        version: version,
        type_id: id,
        value: 0,
        operands: [],
        remaining: binary.substring(length),
      };
      while (remaining.length > 0 && parseInt(remaining, 2) != 0) {
        const output: packet = parse_packet(remaining);
        remaining = output.remaining;
        parsed.operands.push(output);
        // console.log(remaining);
      }
      // console.log("remaining 1 " + parsed.remaining);
      return parsed;
    } else {
      // 11 bits number of sub packets
      const count: number = parseInt(binary.substring(0, 11), 2);
      // console.log("parsing " + count + " packets");
      binary = binary.substring(11);
      const parsed: packet = {
        version: version,
        type_id: id,
        value: 0,
        operands: [],
        remaining: "",
      };
      for (let i = 0; i < count; i++) {
        if (binary.length == 0) {
          console.log("ERROR NOT ENOUGH PACKETS " + count);
          break;
        }
        const output: packet = parse_packet(binary);
        binary = output.remaining;
        parsed.operands.push(output);
      }
      parsed.remaining = binary;
      // console.log("remaining 2 " + parsed.remaining);
      return parsed;
    }
  }
}

function sum_versions(parsed: packet): number {
  return (
    parsed.version +
    parsed.operands.reduce((acc, elem) => acc + sum_versions(elem), 0)
  );
}

// function print_packets(parsed: packet, prefix: string = ""): void {
//   if (parsed.type_id == 4) {
//     console.log(prefix + "(" + parsed.version + ") literal: " + parsed.value);
//   } else {
//     console.log(
//       prefix + "(" + parsed.version + ") operator (" + parsed.type_id + ") :",
//     );
//     parsed.operands.map((a) => print_packets(a, prefix + " "));
//   }
// }

export async function sixteen_b(): Promise<number> {
  const file = Bun.file("inputs/sixteen.txt");
  let binary: string = "";

  for (let line of (await file.text()).split("\n")) {
    line = line.trim();
    for (const char of line) {
      binary += convert[char] as string;
    }
    //binary = parseInt(line.trim(), 16).toString(2);
  }

  const parsed: packet = parse_packet(binary);

  return evaluate_packet(parsed);
}

function evaluate_packet(parsed: packet): number {
  if (parsed.type_id == 4) {
    return parsed.value;
  } else if (parsed.type_id == 0) {
    // sum
    return parsed.operands.reduce(
      (acc, elem) => acc + evaluate_packet(elem),
      0,
    );
  } else if (parsed.type_id == 1) {
    // product
    return parsed.operands.reduce(
      (acc, elem) => acc * evaluate_packet(elem),
      1,
    );
  } else if (parsed.type_id == 2) {
    // min
    return parsed.operands.reduce(
      (acc, elem) => Math.min(acc, evaluate_packet(elem)),
      Number.MAX_SAFE_INTEGER,
    );
  } else if (parsed.type_id == 3) {
    // max
    return parsed.operands.reduce(
      (acc, elem) => Math.max(acc, evaluate_packet(elem)),
      Number.MIN_SAFE_INTEGER,
    );
  } else if (parsed.type_id == 5) {
    // greater than
    if (
      evaluate_packet(parsed.operands[0]) > evaluate_packet(parsed.operands[1])
    ) {
      return 1;
    } else {
      return 0;
    }
  } else if (parsed.type_id == 6) {
    // less than
    if (
      evaluate_packet(parsed.operands[0]) < evaluate_packet(parsed.operands[1])
    ) {
      return 1;
    } else {
      return 0;
    }
  } else if (parsed.type_id == 7) {
    // equals
    if (
      evaluate_packet(parsed.operands[0]) == evaluate_packet(parsed.operands[1])
    ) {
      return 1;
    } else {
      return 0;
    }
  }
}

console.log(await sixteen_a());
console.log(await sixteen_b());
