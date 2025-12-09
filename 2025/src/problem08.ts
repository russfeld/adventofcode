import { Heap } from "heap-js";

export function problem08a(inputfile: string, stop: number): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const locs: number[][] = input.map((x) =>
    x.split(",").map((y) => Number.parseInt(y))
  );
  const len = locs.length;
  const edges: Heap<Edge> = new Heap((a, b) => a.len - b.len);
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const dist = (locs[i][0] - locs[j][0]) ** 2 +
        (locs[i][1] - locs[j][1]) ** 2 + (locs[i][2] - locs[j][2]) ** 2;
      edges.add(new Edge(dist, i, j));
    }
  }
  let circuits: Set<number>[] = [];
  for (let i = 0; i < stop; i++) {
    const edge = edges.poll();
    if (edge != undefined) {
      // console.log(`${edge.start} - ${edge.end} : ${edge.len}`)
      let first: number = -1;
      let second: number = -1;
      let same: boolean = false;
      for (let j = 0; j < circuits.length; j++) {
        const circuit = circuits[j];
        if (circuit.has(edge.start) && circuit.has(edge.end)) {
          same = true;
          break;
        }
        if (circuit.has(edge.start)) {
          first = j;
        }
        if (circuit.has(edge.end)) {
          second = j;
        }
      }
      if (same) {
        // console.log("Same Circuit")
        // i -= 1;
        continue;
      }
      if (first < 0 && second < 0) {
        // console.log("New Circuit")
        const set = new Set<number>();
        set.add(edge.start);
        set.add(edge.end);
        circuits.push(set);
      } else if (first < 0) {
        // console.log("Add Start")
        circuits[second].add(edge.start);
      } else if (second < 0) {
        // console.log("Add End")
        circuits[first].add(edge.end);
      } else {
        // console.log("Merge")
        circuits[first] = circuits[first].union(circuits[second]);
        circuits.splice(second, 1);
      }
    } else {
      throw new Error("Out of edges!");
    }
    // console.log(circuits)
  }
  circuits = circuits.sort((a, b) => b.size - a.size);
  return circuits[0].size * circuits[1].size * circuits[2].size;
}

class Edge {
  public constructor(
    public len: number,
    public start: number,
    public end: number,
  ) {
  }
}

export function problem08b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const locs: number[][] = input.map((x) =>
    x.split(",").map((y) => Number.parseInt(y))
  );
  const len = locs.length;
  const edges: Heap<Edge> = new Heap((a, b) => a.len - b.len);
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const dist = (locs[i][0] - locs[j][0]) ** 2 +
        (locs[i][1] - locs[j][1]) ** 2 + (locs[i][2] - locs[j][2]) ** 2;
      edges.add(new Edge(dist, i, j));
    }
  }
  const circuits: Set<number>[] = [];
  let edge = edges.peek();
  while (circuits.length != 1 || circuits[0].size < len) {
    edge = edges.poll();
    if (edge != undefined) {
      // console.log(`${edge.start} - ${edge.end} : ${edge.len}`)
      let first: number = -1;
      let second: number = -1;
      let same: boolean = false;
      for (let j = 0; j < circuits.length; j++) {
        const circuit = circuits[j];
        if (circuit.has(edge.start) && circuit.has(edge.end)) {
          same = true;
          break;
        }
        if (circuit.has(edge.start)) {
          first = j;
        }
        if (circuit.has(edge.end)) {
          second = j;
        }
      }
      if (same) {
        // console.log("Same Circuit")
        // i -= 1;
        continue;
      }
      if (first < 0 && second < 0) {
        // console.log("New Circuit")
        const set = new Set<number>();
        set.add(edge.start);
        set.add(edge.end);
        circuits.push(set);
      } else if (first < 0) {
        // console.log("Add Start")
        circuits[second].add(edge.start);
      } else if (second < 0) {
        // console.log("Add End")
        circuits[first].add(edge.end);
      } else {
        // console.log("Merge")
        circuits[first] = circuits[first].union(circuits[second]);
        circuits.splice(second, 1);
      }
    } else {
      throw new Error("Out of edges!");
    }
    // console.log(circuits)
  }
  if (edge != undefined) {
    return locs[edge.start][0] * locs[edge.end][0];
  } else {
    throw new Error("Edge Undefined");
  }
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem08a("inputs/08e.txt", 10));
  console.log(problem08b("inputs/08e.txt"));
  console.log("Real Inputs");
  console.log(problem08a("inputs/08.txt", 1000));
  console.log(problem08b("inputs/08.txt"));
}

// 11913 too low

Deno.bench("problem08a", () => {
  problem08a("inputs/08.txt", 1000);
});

Deno.bench("problem08b", () => {
  problem08b("inputs/08.txt");
});
