export function problem08a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix = input.split("\n").map((line) => line.split(""));
  const antennas: { id: string; nodes: [number, number][] }[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== ".") {
        if (antennas.some((antenna) => antenna.id === matrix[i][j])) {
          antennas.find((antenna) => antenna.id === matrix[i][j])?.nodes.push([
            i,
            j,
          ]);
        } else {
          antennas.push({ id: matrix[i][j], nodes: [[i, j]] });
        }
      }
    }
  }
  const m: number = matrix.length;
  const n: number = matrix[0].length;
  const antinodes: [number, number][] = [];
  antennas.forEach((antenna) => {
    for (let i = 0; i < antenna.nodes.length - 1; i++) {
      for (let j = i + 1; j < antenna.nodes.length; j++) {
        const diff: [number, number] = [
          antenna.nodes[i][0] - antenna.nodes[j][0],
          antenna.nodes[i][1] - antenna.nodes[j][1],
        ];
        const an1: [number, number] = [
          antenna.nodes[i][0] + diff[0],
          antenna.nodes[i][1] + diff[1],
        ];
        const an2: [number, number] = [
          antenna.nodes[j][0] - diff[0],
          antenna.nodes[j][1] - diff[1],
        ];
        if (
          !antinodes.some((antinode) => antinode[0] === an1[0] && antinode[1] === an1[1])
        ) {
          antinodes.push(an1);
        }
        if (
          !antinodes.some((antinode) => antinode[0] === an2[0] && antinode[1] === an2[1])
        ) {
          antinodes.push(an2);
        }
      }
    }
  });
  const filtered = antinodes.filter((antinode) => antinode[0] >= 0 && antinode[0] < m && antinode[1] >= 0 && antinode[1] < n);
  return filtered.length;
}

export function problem08b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix = input.split("\n").map((line) => line.split(""));
  const antennas: { id: string; nodes: [number, number][] }[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== ".") {
        if (antennas.some((antenna) => antenna.id === matrix[i][j])) {
          antennas.find((antenna) => antenna.id === matrix[i][j])?.nodes.push([
            i,
            j,
          ]);
        } else {
          antennas.push({ id: matrix[i][j], nodes: [[i, j]] });
        }
      }
    }
  }
  const m: number = matrix.length;
  const n: number = matrix[0].length;
  const antinodes: [number, number][] = [];
  antennas.forEach((antenna) => {
    for (let i = 0; i < antenna.nodes.length - 1; i++) {
      if (
        !antinodes.some((antinode) =>
          antinode[0] === antenna.nodes[i][0] &&
          antinode[1] === antenna.nodes[i][1]
        )
      ) {
        antinodes.push(antenna.nodes[i]);
      }
      for (let j = i + 1; j < antenna.nodes.length; j++) {
        let diff: [number, number] = [
          antenna.nodes[i][0] - antenna.nodes[j][0],
          antenna.nodes[i][1] - antenna.nodes[j][1],
        ];
        diff = [
          diff[0] / gcd(diff[0], diff[1]),
          diff[1] / gcd(diff[0], diff[1]),
        ];
        let multiplier = 1;
        while (
          antenna.nodes[i][0] + diff[0] * multiplier >= 0 &&
          antenna.nodes[i][0] + diff[0] * multiplier < m &&
          antenna.nodes[i][1] + diff[1] * multiplier >= 0 &&
          antenna.nodes[i][1] + diff[1] * multiplier < n
        ) {
          const an1: [number, number] = [
            antenna.nodes[i][0] + diff[0] * multiplier,
            antenna.nodes[i][1] + diff[1] * multiplier,
          ];
          if (
            !antinodes.some((antinode) => antinode[0] === an1[0] && antinode[1] === an1[1])
          ) {
            antinodes.push(an1);
          }
          multiplier++;
        }
        multiplier = 1;
        while (
          antenna.nodes[i][0] - diff[0] * multiplier >= 0 &&
          antenna.nodes[i][0] - diff[0] * multiplier < m &&
          antenna.nodes[i][1] - diff[1] * multiplier >= 0 &&
          antenna.nodes[i][1] - diff[1] * multiplier < n
        ) {
          const an2: [number, number] = [
            antenna.nodes[i][0] - diff[0] * multiplier,
            antenna.nodes[i][1] - diff[1] * multiplier,
          ];
          if (
            !antinodes.some((antinode) => antinode[0] === an2[0] && antinode[1] === an2[1])
          ) {
            antinodes.push(an2);
          }
          multiplier++;
        }
      }
    }
  });
  const filtered = antinodes.filter((antinode) => antinode[0] >= 0 && antinode[0] < m && antinode[1] >= 0 && antinode[1] < n);
  return filtered.length;
}

function gcd(a: number, b: number): number {
  if (!b) {
    return Math.abs(a);
  }
  return gcd(b, a % b);
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem08a("inputs/08e.txt"));
  console.log(problem08b("inputs/08e.txt"));
  console.log("Real Inputs");
  console.log(problem08a("inputs/08.txt"));
  console.log(problem08b("inputs/08.txt"));
}

Deno.bench("problem08a", () => {
  problem08a("inputs/08.txt");
});

Deno.bench("problem08b", () => {
  problem08b("inputs/08.txt");
});
