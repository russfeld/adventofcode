export function problem14a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile).split("\n");
  let q_1: number = 0;
  let q_2: number = 0;
  let q_3: number = 0;
  let q_4: number = 0;
  let m: number = 101;
  let n: number = 103;
  const iterations: number = 100;
  if (inputfile.includes("e")) {
    m = 11;
    n = 7;
  }
  const m_mid = (m - 1) / 2;
  const n_mid = (n - 1) / 2;
  for (const line of input) {
    const regex = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/gi;
    const matches = [...line.matchAll(regex)];
    // console.log(matches);
    const x = Number.parseInt(matches[0][1]);
    const y = Number.parseInt(matches[0][2]);
    const v_x = Number.parseInt(matches[0][3]);
    const v_y = Number.parseInt(matches[0][4]);
    //console.log(x, y, v_x, v_y);
    const x_update = (((x + (v_x * iterations)) % m) + m) % m;
    const y_update = (((y + (v_y * iterations)) % n) + n) % n;
    // console.log(x_update, y_update);
    if (x_update < m_mid && y_update < n_mid) {
      // console.log("q1");
      q_1++;
    } else if (x_update > m_mid && y_update < n_mid) {
      // console.log("q2");
      q_2++;
    } else if (x_update < m_mid && y_update > n_mid) {
      // console.log("q3");
      q_3++;
    } else if (x_update > m_mid && y_update > n_mid) {
      // console.log("q4");
      q_4++;
    }
  }
  return q_1 * q_2 * q_3 * q_4;
}

export function problem14b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile).split("\n");
  let m: number = 101;
  let n: number = 103;
  if (inputfile.includes("e")) {
    m = 11;
    n = 7;
  }
  const robots: Robot[] = [];
  for (const line of input) {
    const regex = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/gi;
    const matches = [...line.matchAll(regex)];
    // console.log(matches);
    const x = Number.parseInt(matches[0][1]);
    const y = Number.parseInt(matches[0][2]);
    const v_x = Number.parseInt(matches[0][3]);
    const v_y = Number.parseInt(matches[0][4]);
    robots.push(new Robot(x, y, v_x, v_y));
  }
  for (let i = 1; i <= 10403; i++) {
    //let buckets: number[] = new Array(n).fill(0);
    for (const robot of robots) {
      robot.move(m, n, 1);
      // if (robot.x < m_mid && robot.y < n_mid) {
      //   // console.log("q1");
      //   q_1++;
      // } else if (robot.x > m_mid && robot.y < n_mid) {
      //   // console.log("q2");
      //   q_2++;
      // } else if (robot.x < m_mid && robot.y > n_mid) {
      //   // console.log("q3");
      //   q_3++;
      // } else if (robot.x > m_mid && robot.y > n_mid) {
      //   // console.log("q4");
      //   q_4++;
      // }
      //buckets[robot.y]++;
    }
    let contig_count: number = 0;
    for (const robot of robots) {
      if (robots.some((r) => (r.x === robot.x && r.y === robot.y + 1) || (r.x == robot.x + 1 && r.y === robot.y))) {
        contig_count++;
      }
    }
    // console.log(q_1, q_2, q_3, q_4);
    if (contig_count > 150) {
      return i;
    }
  }
  // for (const robot of robots) {
  //   robot.move(m, n, 2024);
  // }
  // console.log(print_robots(robots, m, n, m_mid, n_mid));
  //console.log(values.sort((a, b) => a - b));
  return 0;
}

class Robot {
  x: number;
  y: number;
  v_x: number;
  v_y: number;
  constructor(x: number, y: number, v_x: number, v_y: number) {
    this.x = x;
    this.y = y;
    this.v_x = v_x;
    this.v_y = v_y;
  }

  move(m: number, n: number, iterations: number): void {
    this.x = (((this.x + (this.v_x * iterations)) % m) + m) % m;
    this.y = (((this.y + (this.v_y * iterations)) % n) + n) % n;
  }
}

function _print_robots(robots: Robot[], m: number, n: number, m_mid: number, n_mid: number): string {
  let output: string = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (j == m_mid) {
        output += "|";
      } else if (i == n_mid) {
        output += "-";
      } else if (robots.some((robot) => robot.x === j && robot.y === i)) {
        output += "#";
      } else {
        output += ".";
      }
    }
    output += "\n";
  }
  return output;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem14a("inputs/14e.txt"));
  console.log(problem14b("inputs/14e.txt"));
  console.log("Real Inputs");
  console.log(problem14a("inputs/14.txt"));
  console.log(problem14b("inputs/14.txt"));
}

Deno.bench("problem14a", () => {
  problem14a("inputs/14.txt");
});

Deno.bench("problem14b", () => {
  problem14b("inputs/14.txt");
});
