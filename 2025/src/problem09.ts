import { Heap } from "heap-js";

export function problem09a(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const locs: number[][] = input.map((x) =>
    x.split(",").map((y) => Number.parseInt(y))
  );
  const len = locs.length;
  const rects: Heap<number> = new Heap(Heap.maxComparator);
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const dist = (Math.abs(locs[i][0] - locs[j][0]) + 1) *
        (Math.abs(locs[i][1] - locs[j][1]) + 1);
      // console.log(`${locs[i]} - ${locs[j]} : ${dist}`)
      rects.add(dist);
    }
  }
  const size = rects.peek();
  if (size != undefined) {
    return size;
  } else {
    throw new Error("No rectangles found!");
  }
}

class Rect {
  public constructor(
    public len: number,
    public start: number,
    public end: number,
  ) {
  }
}

export function problem09b(inputfile: string): number {
  const input: string[] = Deno.readTextFileSync(inputfile).split("\n");
  const locs: number[][] = input.map((x) =>
    x.split(",").map((y) => Number.parseInt(y))
  );
  const len = locs.length;
  const rects: Heap<Rect> = new Heap((a, b) => b.len - a.len);
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const dist = (Math.abs(locs[i][0] - locs[j][0]) + 1) *
        (Math.abs(locs[i][1] - locs[j][1]) + 1);
      // console.log(`${locs[i]} - ${locs[j]} : ${dist}`)
      rects.add(new Rect(dist, i, j));
    }
  }
  while (rects.size() > 0) {
    const rect = rects.poll();
    if (rect != undefined) {
      const point1: number[] = locs[rect.start];
      const point2: number[] = [locs[rect.start][0], locs[rect.end][1]];
      const point3: number[] = locs[rect.end];
      const point4: number[] = [locs[rect.end][0], locs[rect.start][1]];
      // console.log(`Checking ${point1} - ${point3}`)
      if (
        noCrosses(locs, point1, point2, point3) &&
        noCrosses(locs, point2, point3, point4) &&
        noCrosses(locs, point3, point4, point1) &&
        noCrosses(locs, point4, point1, point2)
      ) {
        // winner winner chicken dinner
        if (inputfile == "inputs/09.txt"){
          _makeSVG(locs, [point1, point2, point3, point4]);
        }
        return rect.len;
      }
    }
  }
  return 0;
}

// This was helpful: https://stackoverflow.com/a/52820021
function noCrosses(
  points: number[][],
  point1: number[],
  point2: number[],
  point3: number[],
): boolean {
  const len = points.length;
  // y direction
  let dim = 0;
  let pdim = 1;
  if (point1[1] == point2[1]) {
    // x direction
    dim = 1;
    pdim = 0;
  }
  for (let i = 0; i < len; i++) {
    const a = points[i];
    const b = points[(i + 1) % len];
    if (a[dim] == b[dim]) {
      // parallel
      if (a[dim] == point1[dim]) {
        // same line
        const s_coord = a[dim];
        if (
          isBetweenE(a[pdim], point1[pdim], b[pdim]) &&
          isBetweenE(a[pdim], point2[pdim], b[pdim])
        ) {
          // our line is completely within edge, which is fine
        } else if (
          isBetweenE(a[pdim], point1[pdim], b[pdim]) ||
          isBetweenE(a[pdim], point2[pdim], b[pdim])
        ) {
          // point1 or point2 is within containing edge but not both
          if (isBetweenE(point1[pdim], a[pdim], point2[pdim])) {
            // a is within internal edge, check gradient to previous point
            const prev = points[(i + len - 1) % len];
            if (point3[dim] < s_coord && prev[dim] < s_coord) {
              // rectangle is left and so is line
              if (point1[pdim] != a[pdim] && point2[pdim] != a[pdim]) {
                // not shared edge, so intersection
                // console.log(`A ${point1} - ${point2} failed at ${a} - ${b}`)
                return false;
              }
            } else if (point3[dim] > s_coord && prev[dim] > s_coord) {
              // rectangle is right and so is line
              if (point1[pdim] != a[pdim] && point2[pdim] != a[pdim]) {
                // not shared edge, so intersection
                // console.log(`B ${point1} - ${point2} failed at ${a} - ${b}`)
                return false;
              }
            }
          } else {
            // b is within internal edge, check gradient to next point
            const next = points[(i + 2) % len];
            if (point3[dim] < s_coord && next[dim] < s_coord) {
              // rectangle is left and so is line
              if (point1[pdim] != b[pdim] && point2[pdim] != b[pdim]) {
                // not shared edge, so intersection
                // console.log(`C ${point1} - ${point2} failed at ${a} - ${b}`)
                return false;
              }
            } else if (point3[dim] > s_coord && next[dim] > s_coord) {
              // rectangle is right and so is line
              if (point1[pdim] != b[pdim] && point2[pdim] != b[pdim]) {
                // not shared edge, so intersection
                // console.log(`D ${point1} - ${point2} failed at ${a} - ${b}`)
                return false;
              }
            }
          }
        } else {
          // the edge is completly within our line
          const prev = points[(i + len - 1) % len];
          const next = points[(i + 2) % len];
          if (
            (prev[dim] < s_coord && next[dim] > s_coord) ||
            (prev[dim] > s_coord && next[dim] < s_coord)
          ) {
            // external line crosses over our line, intersection
            // console.log(`E ${point1} - ${point2} failed at ${a} - ${b}`)
            return false;
          }
          if (
            (point3[dim] < s_coord && prev[dim] < s_coord &&
              next[dim] < s_coord) ||
            (point3[dim] > s_coord && prev[dim] > s_coord &&
              next[dim] > s_coord)
          ) {
            // external line is a U inside of our shape, intersection
            // console.log(`F ${point1} - ${point2} failed at ${a} - ${b}`)
            return false;
          }
        }
      } else {
        // don't care as lines don't intersect
      }
    } else {
      // perpendicular
      if (
        isBetween(point1[pdim], a[pdim], point2[pdim]) &&
        isBetween(a[dim], point1[dim], b[dim])
      ) {
        // intersection
        // console.log(`G ${point1} - ${point2} failed at ${a} - ${b}`)
        return false;
      }
    }
  }
  return true;
}

function isBetween(a: number, b: number, c: number): boolean {
  if (a < c) {
    return a < b && b < c;
  } else {
    return c < b && b < a;
  }
}

function isBetweenE(a: number, b: number, c: number): boolean {
  if (a < c) {
    return a <= b && b <= c;
  } else {
    return c <= b && b <= a;
  }
}

function _makeSVG(points: number[][], rect: number[][]) {
  const pointsString = points.map((p) => `${p[0]},${p[1]}`).join(" ");
  const rectString = rect.map((p) => `${p[0]},${p[1]}`).join(" ");
  const svgContent = `
    <svg width="500" height="500" viewBox="0 0 100000 100000" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${pointsString}" style="fill:lime;stroke:purple;stroke-width:1" />
        <polygon points="${rectString}" style="fill:red;stroke:black;stroke-width:1" />
    </svg>
  `;
  const encoder = new TextEncoder();
  const data = encoder.encode(svgContent);
  Deno.writeFileSync("outputs/problem09.svg", data);
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem09a("inputs/09e.txt"));
  console.log(problem09b("inputs/09e.txt"));
  console.log("Real Inputs");
  console.log(problem09a("inputs/09.txt"));
  console.log(problem09b("inputs/09.txt"));
}

Deno.bench("problem09a", () => {
  problem09a("inputs/09.txt");
});

Deno.bench("problem09b", () => {
  problem09b("inputs/09.txt");
});
