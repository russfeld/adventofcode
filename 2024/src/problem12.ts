export function problem12a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix: string[][] = input.trim().split("\n").map((line) =>
    line.trim().split("")
  );
  let sum: number = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == matrix[i][j].toUpperCase()) {
        const letter = matrix[i][j];
        // console.log(letter);
        matrix[i][j] = letter.toLowerCase();
        const results: [number, number] = walk(matrix, i, j, letter, "");
        // console.log(results[0], results[1]);
        sum += results[0] * (results[1]);
      }
    }
  }
  return sum;
}

function walk(
  matrix: string[][],
  i: number,
  j: number,
  letter: string,
  prefix: string,
): [number, number] {
  let count: number = 1;
  let perim: number = 4;
  if (i > 0) {
    if (matrix[i - 1][j] == letter) {
      matrix[i - 1][j] = letter.toLowerCase();
      perim--;
      const out: [number, number] = walk(
        matrix,
        i - 1,
        j,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim += out[1];
    } else if (matrix[i - 1][j] == letter.toLowerCase()) {
      perim--;
    }
  }
  if (i < matrix.length - 1) {
    if (matrix[i + 1][j] == letter) {
      matrix[i + 1][j] = letter.toLowerCase();
      perim--;
      const out: [number, number] = walk(
        matrix,
        i + 1,
        j,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim += out[1];
    } else if (matrix[i + 1][j] == letter.toLowerCase()) {
      perim--;
    }
  }
  if (j > 0) {
    if (matrix[i][j - 1] == letter) {
      matrix[i][j - 1] = letter.toLowerCase();
      perim--;
      const out: [number, number] = walk(
        matrix,
        i,
        j - 1,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim += out[1];
    } else if (matrix[i][j - 1] == letter.toLowerCase()) {
      perim--;
    }
  }
  if (j < matrix[i].length - 1) {
    if (matrix[i][j + 1] == letter) {
      matrix[i][j + 1] = letter.toLowerCase();
      perim--;
      const out: [number, number] = walk(
        matrix,
        i,
        j + 1,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim += out[1];
    } else if (matrix[i][j + 1] == letter.toLowerCase()) {
      perim--;
    }
  }
  //console.log(prefix, i, j, count, perim);
  return [count, perim];
}

export function problem12b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const matrix: string[][] = input.trim().split("\n").map((line) =>
    line.trim().split("")
  );
  let sum: number = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == matrix[i][j].toUpperCase()) {
        const letter = matrix[i][j];
        // console.log(letter);
        matrix[i][j] = letter.toLowerCase();
        const out: [number, LineSegment[]] = walkarea(matrix, i, j, letter, "");
        //console.log(letter, out[0])
        const connected: LineSegment[] = [];
        while (out[1].length > 0) {
          const seg = out[1][0];
          let found: boolean = false;
          for (let l = 1; l < out[1].length; l++) {
            if (seg.parallel_connected(out[1][l])) {
              const seg2 = out[1].splice(l, 1)[0];
              out[1].splice(0, 1);
              const comb: LineSegment | null = seg.combine(seg2);
              if (comb != null) {
                out[1].push(comb);
                found = true;
                break;
              }
            }
          }
          if (!found) {
            connected.push(out[1].splice(0, 1)[0]);
          }
        }
        //console.log(connected.length);
        //console.log(connected.map((x) => x.toString()).join("\n"));
        sum += out[0] * (connected.length);
      }
    }
  }
  return sum;
}

class LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dir: boolean;

  public constructor(
    public ax1: number,
    public ay1: number,
    public ax2: number,
    public ay2: number,
    public adir: boolean,
  ) {
    if (ax1 < ax2) {
      this.x1 = ax1;
      this.x2 = ax2;
    } else {
      this.x1 = ax2;
      this.x2 = ax1;
    }
    if (ay1 < ay2) {
      this.y1 = ay1;
      this.y2 = ay2;
    } else {
      this.y1 = ay2;
      this.y2 = ay1;
    }
    this.dir = adir;
  }

  public parallel_connected(other: LineSegment): boolean {
    if (
      this.x1 == this.x2 && other.x1 == other.x2 && this.x1 == other.x1 &&
      this.dir == other.dir
    ) {
      return this.y1 == other.y2 || this.y2 == other.y1;
    }
    if (
      this.y1 == this.y2 && other.y1 == other.y2 && this.y1 == other.y1 &&
      this.dir == other.dir
    ) {
      return this.x1 == other.x2 || this.x2 == other.x1;
    }
    return false;
  }

  public combine(other: LineSegment): LineSegment | null {
    if (this.x1 == this.x2 && other.x1 == other.x2 && this.x1 == other.x1) {
      return new LineSegment(
        this.x1,
        Math.min(this.y1, other.y1),
        this.x2,
        Math.max(this.y2, other.y2),
        this.dir,
      );
    }
    if (this.y1 == this.y2 && other.y1 == other.y2 && this.y1 == other.y1) {
      return new LineSegment(
        Math.min(this.x1, other.x1),
        this.y1,
        Math.max(this.x2, other.x2),
        this.y2,
        this.dir,
      );
    }
    return null;
  }

  public toString(): string {
    return "(" + this.x1 + ", " + this.y1 + ") -> (" + this.x2 + ", " +
      this.y2 + ")";
  }
}

function walkarea(
  matrix: string[][],
  i: number,
  j: number,
  letter: string,
  prefix: string,
): [number, LineSegment[]] {
  let count: number = 1;
  let perim: LineSegment[] = [];
  if (i > 0) {
    if (matrix[i - 1][j] == letter) {
      matrix[i - 1][j] = letter.toLowerCase();
      const out: [number, LineSegment[]] = walkarea(
        matrix,
        i - 1,
        j,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim = perim.concat(out[1]);
    } else if (matrix[i - 1][j] != letter.toLowerCase()) {
      perim.push(new LineSegment(i, j, i, j + 1, false));
    }
  } else if (i == 0) {
    perim.push(new LineSegment(i, j, i, j + 1, false));
  }
  if (i < matrix.length - 1) {
    if (matrix[i + 1][j] == letter) {
      matrix[i + 1][j] = letter.toLowerCase();
      const out: [number, LineSegment[]] = walkarea(
        matrix,
        i + 1,
        j,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim = perim.concat(out[1]);
    } else if (matrix[i + 1][j] != letter.toLowerCase()) {
      perim.push(new LineSegment(i + 1, j, i + 1, j + 1, true));
    }
  } else if (i == matrix.length - 1) {
    perim.push(new LineSegment(i + 1, j, i + 1, j + 1, true));
  }
  if (j > 0) {
    if (matrix[i][j - 1] == letter) {
      matrix[i][j - 1] = letter.toLowerCase();
      const out: [number, LineSegment[]] = walkarea(
        matrix,
        i,
        j - 1,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim = perim.concat(out[1]);
    } else if (matrix[i][j - 1] != letter.toLowerCase()) {
      perim.push(new LineSegment(i, j, i + 1, j, false));
    }
  } else if (j == 0) {
    perim.push(new LineSegment(i, j, i + 1, j, false));
  }
  if (j < matrix[i].length - 1) {
    if (matrix[i][j + 1] == letter) {
      matrix[i][j + 1] = letter.toLowerCase();
      const out: [number, LineSegment[]] = walkarea(
        matrix,
        i,
        j + 1,
        letter,
        prefix + " ",
      );
      count += out[0];
      perim = perim.concat(out[1]);
    } else if (matrix[i][j + 1] != letter.toLowerCase()) {
      perim.push(new LineSegment(i, j + 1, i + 1, j + 1, true));
    }
  } else if (j == matrix[i].length - 1) {
    perim.push(new LineSegment(i, j + 1, i + 1, j + 1, true));
  }
  return [count, perim];
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem12a("inputs/12e.txt"));
  console.log(problem12b("inputs/12e.txt"));
  console.log("Real Inputs");
  console.log(problem12a("inputs/12.txt"));
  console.log(problem12b("inputs/12.txt"));
}

Deno.bench("problem12a", () => {
  problem12a("inputs/12.txt");
});

Deno.bench("problem12b", () => {
  problem12b("inputs/12.txt");
});
