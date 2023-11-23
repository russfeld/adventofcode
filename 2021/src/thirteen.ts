export async function thirteen_a(): Promise<number> {
  const file = Bun.file("inputs/thirteen.txt");

  let points: Set<string> = new Set();

  for (const line of (await file.text()).split("\n")) {
    if (line.trim().length == 0) {
      continue;
    }
    if (line.startsWith("fold along")) {
      const parts: string[] = line.trim().split("=");
      const axis = parseInt(parts[1]);
      const newpoints: Set<string> = new Set();
      if (parts[0].endsWith("y")) {
        for (const dot of points) {
          const parts: number[] = dot.split(",").map(Number);
          if (parts[1] > axis) {
            const new_y = parts[1] - (parts[1] - axis) * 2;
            newpoints.add(parts[0] + "," + new_y);
          } else {
            newpoints.add(dot);
          }
        }
      } else {
        for (const dot of points) {
          const parts: number[] = dot.split(",").map(Number);
          if (parts[0] > axis) {
            const new_x = parts[0] - (parts[0] - axis) * 2;
            newpoints.add(new_x + "," + parts[1]);
          } else {
            newpoints.add(dot);
          }
        }
      }

      points = newpoints;
      // print_graph(points);

      break;
    } else {
      points.add(line.trim());
    }
  }

  return points.size;
}

function print_graph(points: Set<string>): void {
  const output: string[][] = [];
  for (let i = 0; i < 6; i++) {
    output.push([]);
    for (let j = 0; j < 5 * 8; j++) {
      output[i].push(".");
    }
  }

  for (const dot of points) {
    const parts: number[] = dot.split(",").map(Number);
    output[parts[1]][parts[0]] = "#";
  }

  for (const line of output) {
    console.log(line.join(""));
  }
}

export async function thirteen_b(): Promise<number> {
  const file = Bun.file("inputs/thirteen.txt");

  let points: Set<string> = new Set();

  for (const line of (await file.text()).split("\n")) {
    if (line.trim().length == 0) {
      continue;
    }
    if (line.startsWith("fold along")) {
      const parts: string[] = line.trim().split("=");
      const axis = parseInt(parts[1]);
      const newpoints: Set<string> = new Set();
      if (parts[0].endsWith("y")) {
        for (const dot of points) {
          const parts: number[] = dot.split(",").map(Number);
          if (parts[1] > axis) {
            const new_y = parts[1] - (parts[1] - axis) * 2;
            newpoints.add(parts[0] + "," + new_y);
          } else {
            newpoints.add(dot);
          }
        }
      } else {
        for (const dot of points) {
          const parts: number[] = dot.split(",").map(Number);
          if (parts[0] > axis) {
            const new_x = parts[0] - (parts[0] - axis) * 2;
            newpoints.add(new_x + "," + parts[1]);
          } else {
            newpoints.add(dot);
          }
        }
      }

      points = newpoints;
    } else {
      points.add(line.trim());
    }
  }

  print_graph(points);

  return points.size;
}

console.log(await thirteen_a());
console.log(await thirteen_b());
