interface graphnode {
  name: string;
  big: boolean;
  edges: graphnode[];
}

export async function twelve_a(): Promise<number> {
  const file = Bun.file("inputs/twelve.txt");

  const graph: Map<string, graphnode> = new Map();

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split("-");
    let startnode: graphnode;
    if (graph.has(parts[0].trim())) {
      startnode = graph.get(parts[0].trim()) as graphnode;
    } else {
      startnode = {
        name: parts[0].trim(),
        big: parts[0].trim().toUpperCase() == parts[0].trim(),
        edges: [],
      };
      graph.set(parts[0].trim(), startnode);
    }
    let endnode: graphnode;
    if (graph.has(parts[1].trim())) {
      endnode = graph.get(parts[1].trim()) as graphnode;
    } else {
      endnode = {
        name: parts[1].trim(),
        big: parts[1].trim().toUpperCase() == parts[1].trim(),
        edges: [],
      };
      graph.set(parts[1].trim(), endnode);
    }
    startnode?.edges.push(endnode);
    endnode?.edges.push(startnode);
  }

  //printgraph(graph);

  const queue: string[][] = [];
  queue.push(["start"]);
  const paths: Set<string> = new Set();

  while (queue.length > 0) {
    const path: string[] = queue.pop() as string[];
    const node: graphnode = graph.get(path[path.length - 1]) as graphnode;
    for (const edge of node.edges) {
      if (edge.name == "end") {
        paths.add(path.join(",") + ",end");
      } else {
        if (edge.big || !path.includes(edge.name)) {
          const newpath: string[] = [...path];
          newpath.push(edge.name);
          queue.push(newpath);
        }
      }
    }
  }

  // console.log(paths);

  return paths.size;
}

// function printgraph(graph: graphnode[]): void {
//   for (const pair of graph) {
//     console.log(pair[0] + " (" + pair[1].big + ") : " + pair[1].edges.map((node) => node.name).join(" "));
//   }
// }

export async function twelve_b(): Promise<number> {
  const file = Bun.file("inputs/twelve.txt");

  const graph: Map<string, graphnode> = new Map();

  for (const line of (await file.text()).split("\n")) {
    const parts: string[] = line.trim().split("-");
    let startnode: graphnode;
    if (graph.has(parts[0].trim())) {
      startnode = graph.get(parts[0].trim()) as graphnode;
    } else {
      startnode = {
        name: parts[0].trim(),
        big: parts[0].trim().toUpperCase() == parts[0].trim(),
        edges: [],
      };
      graph.set(parts[0].trim(), startnode);
    }
    let endnode: graphnode;
    if (graph.has(parts[1].trim())) {
      endnode = graph.get(parts[1].trim()) as graphnode;
    } else {
      endnode = {
        name: parts[1].trim(),
        big: parts[1].trim().toUpperCase() == parts[1].trim(),
        edges: [],
      };
      graph.set(parts[1].trim(), endnode);
    }
    startnode?.edges.push(endnode);
    endnode?.edges.push(startnode);
  }

  //printgraph(graph);

  const queue: string[][] = [];
  queue.push(["start"]);
  const paths: Set<string> = new Set();

  while (queue.length > 0) {
    const path: string[] = queue.pop() as string[];
    const node: graphnode = graph.get(path[path.length - 1]) as graphnode;
    for (const edge of node.edges) {
      if (edge.name == "end") {
        paths.add(path.join(",") + ",end");
      } else {
        if (edge.big) {
          const newpath: string[] = [...path];
          newpath.push(edge.name);
          queue.push(newpath);
        } else if (edge.name != "start") {
          if (has_duplicate(path)) {
            if (!path.includes(edge.name)) {
              const newpath: string[] = [...path];
              newpath.push(edge.name);
              queue.push(newpath);
            }
          } else {
            const newpath: string[] = [...path];
            newpath.push(edge.name);
            queue.push(newpath);
          }
        }
      }
    }
  }

  function has_duplicate(path: string[]): boolean {
    path = path.filter((item) => item.toLowerCase() == item);
    return new Set<string>(path).size != path.length;
  }

  // console.log(paths);

  return paths.size;
}

console.log(await twelve_a());
console.log(await twelve_b());
