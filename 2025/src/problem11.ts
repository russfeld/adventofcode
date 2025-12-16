export function problem11a(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const nodes: Map<string, Set<string>> = new Map();
  for (const line of input) {
    const splits = line.split(":");
    const outs = splits[1].trim().split(" ");
    const edges: Set<string> = new Set();
    for (const out of outs) {
      edges.add(out);
    }
    nodes.set(splits[0], edges);
  }
  const paths: Path[] = [];
  const queue: Path[] = [];
  queue.push(new Path().see("you"));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path) {
      // console.log(path.string())
      const edges = nodes.get(path.last());
      // console.log(edges)
      if (edges) {
        for (const edge of edges) {
          if (edge == "out") {
            paths.push(path.dupe().see("out"));
          } else if (!path.seen.has(edge)) {
            queue.push(path.dupe().see(edge));
          }
        }
      }
    }
  }
  // console.log(paths.map((x) => x.string()).join("\n"))
  return paths.length;
}

class Path {
  public constructor(
    public seen: Set<string> = new Set(),
    public path: string[] = [],
  ) {
  }

  public see(node: string) {
    this.seen.add(node);
    this.path.push(node);
    return this;
  }

  public last() {
    return this.path[this.path.length - 1];
  }

  public dupe() {
    return new Path(new Set(this.seen), [...this.path]);
  }

  public string() {
    return `${this.path}`;
  }
}

export function problem11b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const nodes: Map<string, Set<string>> = new Map();
  for (const line of input) {
    const splits = line.split(":");
    const outs = splits[1].trim().split(" ");
    const edges: Set<string> = new Set();
    for (const out of outs) {
      edges.add(out);
    }
    nodes.set(splits[0], edges);
  }
  const pathsSrvToFft = findPathsMemo(
    "svr",
    "fft",
    new Set(["dac", "out"]),
    nodes,
    new Map().set("fft", 1),
  );
  // console.log(pathsSrvToFft)
  const pathsSrvToDac = findPathsMemo(
    "svr",
    "dac",
    new Set(["fft", "out"]),
    nodes,
    new Map().set("dac", 1),
  );
  // console.log(pathsSrvToDac)
  const pathsFftToDac = findPathsMemo(
    "fft",
    "dac",
    new Set(["svr", "out"]),
    nodes,
    new Map().set("dac", 1),
  );
  // console.log(pathsFftToDac)
  const pathsDacToFft = findPathsMemo(
    "dac",
    "fft",
    new Set(["svr", "out"]),
    nodes,
    new Map().set("fft", 1),
  );
  // console.log(pathsDacToFft)
  const pathsDacToOut = findPathsMemo(
    "dac",
    "out",
    new Set(["svr", "fft"]),
    nodes,
    new Map().set("out", 1),
  );
  // console.log(pathsDacToOut)
  const pathsFftToOut = findPathsMemo(
    "fft",
    "out",
    new Set(["svr", "dac"]),
    nodes,
    new Map().set("out", 1),
  );
  // console.log(pathsFftToOut)

  return (pathsSrvToFft * pathsFftToDac * pathsDacToOut) +
    (pathsSrvToDac * pathsDacToFft * pathsFftToOut);
}

// https://stackoverflow.com/a/70100697
function findPathsMemo(
  start: string,
  end: string,
  avoid: Set<string>,
  nodes: Map<string, Set<string>>,
  memo: Map<string, number>,
): number {
  if (start == end) {
    const solve = memo.get(end);
    if (solve) {
      return solve;
    } else {
      throw new Error("Unable to solve!");
    }
  } else if (memo.has(start)) {
    const solve = memo.get(start);
    if (solve != undefined) {
      return solve;
    } else {
      throw new Error("Impossiburu");
    }
  }
  {
    const edges = nodes.get(start);
    if (edges) {
      let count = 0;
      for (const edge of edges) {
        if (!avoid.has(edge)) {
          count += findPathsMemo(edge, end, avoid, nodes, memo);
        }
      }
      memo.set(start, count);
      return count;
    } else {
      throw new Error("Can't find edges");
    }
  }
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem11a("inputs/11e.txt"));
  console.log(problem11b("inputs/11e2.txt"));
  console.log("Real Inputs");
  console.log(problem11a("inputs/11.txt"));
  console.log(problem11b("inputs/11.txt"));
}

Deno.bench("problem11a", () => {
  problem11a("inputs/11.txt");
});

Deno.bench("problem11b", () => {
  problem11b("inputs/11.txt");
});
