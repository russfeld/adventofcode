import { Graph } from "@datastructures-js/graph";
import { IGetCompareValue, MinPriorityQueue } from "@datastructures-js/priority-queue";

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

class Walk {
  curr: Point;
  score: number;
  direction: string;
  path: string[];
  constructor(curr: Point, score: number, direction: string, path: string[]) {
    this.curr = curr;
    this.score = score;
    this.direction = direction;
    this.path = path;
  }

  toString() {
    return `${this.curr.toString()} ${this.score} ${this.direction} ${this.path}`;
  }
}

const getWalkvalue: IGetCompareValue<Walk> = (walk: Walk): number => {
  return walk.score;
};

function num_turns(dir1: string, dir2: string): number {
  if (dir1 == dir2) {
    return 0;
  }
  if (dir1 == "N") {
    return dir2 == "S" ? 2 : 1;
  }
  if (dir1 == "E") {
    return dir2 == "W" ? 2 : 1;
  }
  if (dir1 == "S") {
    return dir2 == "N" ? 2 : 1;
  }
  if (dir1 == "W") {
    return dir2 == "E" ? 2 : 1;
  }
  return 0;
}

function _print_path(maze: string[][], path: string[]) {
  const new_maze = maze.map((line) => [...line]);
  for (const node_str of path) {
    const node = node_str.split(",").map(Number);
    new_maze[node[0]][node[1]] = "O";
  }
  for (const line of new_maze) {
    console.log(line.join(""));
  }
}

function _compute_score(path: string[]) {
  let score = 0;
  let prev = undefined;
  let dir = true;
  for (const node_str of path) {
    const node = node_str.split(",").map(Number);
    if (!prev) {
      prev = new Point(node[0], node[1]);
    } else {
      score += Math.abs(node[0] - prev.x) + Math.abs(node[1] - prev.y);
      if (dir) {
        if (node[0] != prev.x) {
          score += 1000;
          dir = false;
        }
      } else {
        if (node[1] != prev.y) {
          score += 1000;
          dir = true;
        }
      }
      prev = new Point(node[0], node[1]);
    }
  }
  console.log(score);
}

export function problem16a(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const maze: string[][] = input.split("\n").map((line) => line.split(""));
  let start: string = "";
  let end: string = "";
  const graph = new Graph<string, Point>();
  for (let i = 0; i < maze.length; i++) {
    let prev = undefined;
    let prev_point = undefined;
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == "S") {
        start = `${i},${j}`;
        maze[i][j] = ".";
      }
      if (maze[i][j] == "E") {
        end = `${i},${j}`;
        maze[i][j] = ".";
      }
      if (maze[i][j] == "#") {
        prev = undefined;
        prev_point = undefined;
        continue;
      }
      if (maze[i][j - 1] == "#" && maze[i][j + 1] == "#" && maze[i - 1][j] == "." && (maze[i + 1][j] == "." || maze[i + 1][j] == "S")) {
        continue;
      }
      if (maze[i - 1][j] == "#" && maze[i + 1][j] == "#" && maze[i][j - 1] == "." && (maze[i][j + 1] == "." || maze[i][j + 1] == "E")) {
        continue;
      }
      // add node here
      const point = new Point(i, j);
      const id = `${i},${j}`;
      graph.addVertex(id, point);
      if (prev && prev_point) {
        graph.addEdge(prev, id, Math.abs(point.x - prev_point.x) + Math.abs(point.y - prev_point.y));
      }
      prev = id;
      prev_point = point;
    }
  }
  for (let j = 0; j < maze[0].length; j++) {
    let prev = undefined;
    let prev_point = undefined;
    for (let i = 0; i < maze.length; i++) {
      if (maze[i][j] == "#") {
        prev = undefined;
        prev_point = undefined;
        continue;
      }
      if (maze[i][j - 1] == "#" && maze[i][j + 1] == "#" && maze[i - 1][j] == "." && maze[i + 1][j] == ".") {
        continue;
      }
      if (maze[i - 1][j] == "#" && maze[i + 1][j] == "#" && maze[i][j - 1] == "." && maze[i][j + 1] == ".") {
        continue;
      }
      const point = new Point(i, j);
      const id = `${i},${j}`;
      if (prev && prev_point) {
        graph.addEdge(prev, id, Math.abs(point.x - prev_point.x) + Math.abs(point.y - prev_point.y));
      }
      prev = id;
      prev_point = point;
    }
  }
  //console.log(start, end);
  //console.log(graph);
  const queue = new MinPriorityQueue<Walk>(getWalkvalue);
  const seen: { [id: string]: number } = {};
  queue.enqueue(new Walk(graph.getVertexValue(start), 0, "E", [start]));
  seen[start + "E"] = 0;
  while (!queue.isEmpty()) {
    const curr = queue.dequeue();
    const curr_str = `${curr.curr.x},${curr.curr.y}`;
    const curr_str_dir = curr_str + curr.direction;
    if (curr_str_dir in seen && seen[curr_str_dir] < curr.score) {
      //console.log("seen", curr_str_dir, seen[curr_str_dir], curr.score);
      continue;
    }
    seen[curr_str_dir] = curr.score;
    if (curr_str == end) {
      //_print_path(maze, curr.path);
      //_compute_score(curr.path);
      //return curr.score;
      //console.log("hit", curr.score);
      continue;
    }
    const neighbors: string[] = graph.getConnectedVertices(curr_str);
    for (const node_str of neighbors) {
      const node = graph.getVertexValue(node_str);
      if (curr.path.includes(node_str)) {
        continue;
      }
      const new_dir = node.x > curr.curr.x ? "S" : node.x < curr.curr.x ? "N" : node.y > curr.curr.y ? "E" : "W";
      const new_path = [...curr.path, node_str];
      const new_score = curr.score + graph.getWeight(curr_str, node_str) + (num_turns(curr.direction, new_dir) * 1000);
      const new_walk = new Walk(node, new_score, new_dir, new_path);
      queue.enqueue(new_walk);
    }
    // console.log(queue);
    // return 0;
  }
  return Math.min(seen[end + "N"], seen[end + "E"]);
}

class PathScore {
  path: string[];
  score: number;
  constructor(path: string[], score: number) {
    this.path = path;
    this.score = score;
  }
}

function add_points(points: Set<string>, path: string[]) {
  let prev = undefined;
  for (const node_str of path) {
    const node = node_str.split(",").map(Number);
    if (!prev) {
      prev = new Point(node[0], node[1]);
    } else {
      if (node[0] != prev.x) {
        for (let i: number = prev.x; i != node[0]; i += prev.x < node[0] ? 1 : -1) {
          points.add(`${i},${prev.y}`);
        }
      } else {
        for (let j: number = prev.y; j != node[1]; j += prev.y < node[1] ? 1 : -1) {
          points.add(`${prev.x},${j}`);
        }
      }
      prev = new Point(node[0], node[1]);
      points.add(`${prev.x},${prev.y}`);
    }
  }
}

export function problem16b(inputfile: string): number {
  const input: string = Deno.readTextFileSync(inputfile);
  const maze: string[][] = input.split("\n").map((line) => line.split(""));
  let start: string = "";
  let end: string = "";
  const graph = new Graph<string, Point>();
  for (let i = 0; i < maze.length; i++) {
    let prev = undefined;
    let prev_point = undefined;
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == "S") {
        start = `${i},${j}`;
        maze[i][j] = ".";
      }
      if (maze[i][j] == "E") {
        end = `${i},${j}`;
        maze[i][j] = ".";
      }
      if (maze[i][j] == "#") {
        prev = undefined;
        prev_point = undefined;
        continue;
      }
      if (maze[i][j - 1] == "#" && maze[i][j + 1] == "#" && maze[i - 1][j] == "." && (maze[i + 1][j] == "." || maze[i + 1][j] == "S")) {
        continue;
      }
      if (maze[i - 1][j] == "#" && maze[i + 1][j] == "#" && maze[i][j - 1] == "." && (maze[i][j + 1] == "." || maze[i][j + 1] == "E")) {
        continue;
      }
      // add node here
      const point = new Point(i, j);
      const id = `${i},${j}`;
      graph.addVertex(id, point);
      if (prev && prev_point) {
        graph.addEdge(prev, id, Math.abs(point.x - prev_point.x) + Math.abs(point.y - prev_point.y));
      }
      prev = id;
      prev_point = point;
    }
  }
  for (let j = 0; j < maze[0].length; j++) {
    let prev = undefined;
    let prev_point = undefined;
    for (let i = 0; i < maze.length; i++) {
      if (maze[i][j] == "#") {
        prev = undefined;
        prev_point = undefined;
        continue;
      }
      if (maze[i][j - 1] == "#" && maze[i][j + 1] == "#" && maze[i - 1][j] == "." && maze[i + 1][j] == ".") {
        continue;
      }
      if (maze[i - 1][j] == "#" && maze[i + 1][j] == "#" && maze[i][j - 1] == "." && maze[i][j + 1] == ".") {
        continue;
      }
      const point = new Point(i, j);
      const id = `${i},${j}`;
      if (prev && prev_point) {
        graph.addEdge(prev, id, Math.abs(point.x - prev_point.x) + Math.abs(point.y - prev_point.y));
      }
      prev = id;
      prev_point = point;
    }
  }
  //console.log(start, end);
  //console.log(graph);
  const queue = new MinPriorityQueue<Walk>(getWalkvalue);
  const seen: { [id: string]: number } = {};
  const paths: PathScore[] = [];
  queue.enqueue(new Walk(graph.getVertexValue(start), 0, "E", [start]));
  seen[start + "E"] = 0;
  while (!queue.isEmpty()) {
    const curr = queue.dequeue();
    const curr_str = `${curr.curr.x},${curr.curr.y}`;
    const curr_str_dir = curr_str + curr.direction;
    if (curr_str_dir in seen && seen[curr_str_dir] < curr.score) {
      //console.log("seen", curr_str_dir, seen[curr_str_dir], curr.score);
      continue;
    }
    seen[curr_str_dir] = curr.score;
    if (curr_str == end) {
      //_print_path(maze, curr.path);
      //_compute_score(curr.path);
      //return curr.score;
      //console.log("hit", curr.score);
      paths.push(new PathScore(curr.path, curr.score));
      continue;
    }
    const neighbors: string[] = graph.getConnectedVertices(curr_str);
    for (const node_str of neighbors) {
      const node = graph.getVertexValue(node_str);
      if (curr.path.includes(node_str)) {
        continue;
      }
      const new_dir = node.x > curr.curr.x ? "S" : node.x < curr.curr.x ? "N" : node.y > curr.curr.y ? "E" : "W";
      const new_path = [...curr.path, node_str];
      const new_score = curr.score + graph.getWeight(curr_str, node_str) + (num_turns(curr.direction, new_dir) * 1000);
      const new_walk = new Walk(node, new_score, new_dir, new_path);
      queue.enqueue(new_walk);
    }
    // console.log(queue);
    // return 0;
  }
  const shortest = Math.min(seen[end + "N"], seen[end + "E"]);
  const points: Set<string> = new Set();
  for (const path of paths) {
    if (path.score == shortest) {
      add_points(points, path.path);
    }
  }
  return points.size;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem16a("inputs/16e.txt"));
  console.log(problem16b("inputs/16e.txt"));
  console.log("Real Inputs");
  console.log(problem16a("inputs/16.txt"));
  console.log(problem16b("inputs/16.txt"));
}

Deno.bench("problem16a", () => {
  problem16a("inputs/16.txt");
});

Deno.bench("problem16b", () => {
  problem16b("inputs/16.txt");
});
