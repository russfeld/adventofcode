class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export function problem18a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile).split("\n");
  const squares: Set<string> = new Set();
  let num_steps = 1024;
  const curr: Point = new Point(0, 0);
  let dest: Point = new Point(70, 70);
  let max = 70;
  if (inputfile.includes("e")) {
    dest = new Point(6, 6);
    max = 6;
    num_steps = 12;
  }
  for (let i = 0; i < num_steps; i++) {
    squares.add(input[i]);
  }
  // a star algorithm
  const open: Point[] = [curr];
  const closed: Point[] = [];
  const gScore: Map<string, number> = new Map();
  const fScore: Map<string, number> = new Map();
  const cameFrom: Map<string, Point> = new Map();
  gScore.set(`${curr.x},${curr.y}`, 0);
  fScore.set(`${curr.x},${curr.y}`, 0);
  while (open.length > 0) {
    let current: Point = open[0];
    let index = 0;
    for (let i = 1; i < open.length; i++) {
      const fScoreOpen = fScore.get(`${open[i].x},${open[i].y}`);
      const fScoreCurrent = fScore.get(`${current.x},${current.y}`);
      if (fScoreOpen != undefined && fScoreCurrent != undefined && fScoreOpen < fScoreCurrent) {
        current = open[i];
        index = i;
      }
    }
    open.splice(index, 1);
    if (current.x === dest.x && current.y === dest.y) {
      const path: Point[] = [current];
      while (cameFrom.has(`${current.x},${current.y}`)) {
        const next = cameFrom.get(`${current.x},${current.y}`);
        current = next == undefined ? current : next;
        path.push(current);
      }
      //console.log(path);
      return path.length - 1;
    }
    closed.push(current);
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (Math.abs(i) == Math.abs(j)) {
          continue;
        }
        const neighbor: Point = new Point(current.x + i, current.y + j);
        if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x > max || neighbor.y > max) {
          continue;
        }
        if (squares.has(`${neighbor.x},${neighbor.y}`)) {
          continue;
        }
        if (closed.find((point) => point.x === neighbor.x && point.y === neighbor.y)) {
          continue;
        }
        const gScoreCurrent = gScore.get(`${current.x},${current.y}`);
        const tentativeGScore: number = gScoreCurrent != undefined ? gScoreCurrent + 1 : 0;
        const gScoreNeighbor = gScore.get(`${neighbor.x},${neighbor.y}`);
        const gScoreNeighborValue = gScoreNeighbor != undefined ? gScoreNeighbor : 0;
        if (!open.find((point) => point.x === neighbor.x && point.y === neighbor.y)) {
          open.push(neighbor);
        } else if (tentativeGScore >= gScoreNeighborValue) {
          continue;
        }
        cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
        gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
        fScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore + Math.abs(neighbor.x - dest.x) + Math.abs(neighbor.y - dest.y));
      }
    }
  }
  return -1;
}

function a_star(squares: Set<string>, curr: Point, dest: Point, max: number): boolean {
  // a star algorithm
  const open: Point[] = [curr];
  const closed: Point[] = [];
  const gScore: Map<string, number> = new Map();
  const fScore: Map<string, number> = new Map();
  const cameFrom: Map<string, Point> = new Map();
  gScore.set(`${curr.x},${curr.y}`, 0);
  fScore.set(`${curr.x},${curr.y}`, 0);
  while (open.length > 0) {
    let current: Point = open[0];
    let index = 0;
    for (let i = 1; i < open.length; i++) {
      const fScoreOpen = fScore.get(`${open[i].x},${open[i].y}`);
      const fScoreCurrent = fScore.get(`${current.x},${current.y}`);
      if (fScoreOpen != undefined && fScoreCurrent != undefined && fScoreOpen < fScoreCurrent) {
        current = open[i];
        index = i;
      }
    }
    open.splice(index, 1);
    if (current.x === dest.x && current.y === dest.y) {
      return true;
    }
    closed.push(current);
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (Math.abs(i) == Math.abs(j)) {
          continue;
        }
        const neighbor: Point = new Point(current.x + i, current.y + j);
        if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x > max || neighbor.y > max) {
          continue;
        }
        if (squares.has(`${neighbor.x},${neighbor.y}`)) {
          continue;
        }
        if (closed.find((point) => point.x === neighbor.x && point.y === neighbor.y)) {
          continue;
        }
        const gScoreCurrent = gScore.get(`${current.x},${current.y}`);
        const tentativeGScore: number = gScoreCurrent != undefined ? gScoreCurrent + 1 : 0;
        const gScoreNeighbor = gScore.get(`${neighbor.x},${neighbor.y}`);
        const gScoreNeighborValue = gScoreNeighbor != undefined ? gScoreNeighbor : 0;
        if (!open.find((point) => point.x === neighbor.x && point.y === neighbor.y)) {
          open.push(neighbor);
        } else if (tentativeGScore >= gScoreNeighborValue) {
          continue;
        }
        cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
        gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
        fScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore + Math.abs(neighbor.x - dest.x) + Math.abs(neighbor.y - dest.y));
      }
    }
  }
  return false;
}

export function problem18b(inputfile: string): string {
  const input = Deno.readTextFileSync(inputfile).split("\n");
  let num_steps = 1024;
  let max_size = 70;
  if (inputfile.includes("e")) {
    max_size = 6;
    num_steps = 12;
  }

  let min = num_steps - 1;
  let max = input.length - 1;
  while (min <= max) {
    const squares: Set<string> = new Set();
    const half = Math.floor((min + max) / 2);
    //console.log(min, max, half);
    for (let i = 0; i < half; i++) {
      squares.add(input[i]);
    }
    const curr: Point = new Point(0, 0);
    let dest: Point = new Point(70, 70);
    if (inputfile.includes("e")) {
      dest = new Point(6, 6);
    }
    if (a_star(squares, curr, dest, max_size)) {
      min = half + 1;
    } else {
      max = half - 1;
    }
  }
  return input[min - 1];
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem18a("inputs/18e.txt"));
  console.log(problem18b("inputs/18e.txt"));
  console.log("Real Inputs");
  console.log(problem18a("inputs/18.txt"));
  console.log(problem18b("inputs/18.txt"));
}

Deno.bench("problem18a", () => {
  problem18a("inputs/18.txt");
});

Deno.bench("problem18b", () => {
  problem18b("inputs/18.txt");
});
