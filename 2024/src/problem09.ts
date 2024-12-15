export function problem09a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: number[] = input.trim().split("").map((x) => Number.parseInt(x));
  let start: number = 0;
  let end: number = array.length - 1;
  if (end % 2 != 0) {
    end--;
  }
  let i: number = 0;
  let sum: number = 0;
  while (start <= end) {
    if (start % 2 == 0) {
      // read next file
      const count = array[start];
      sum += (start / 2) * (count / 2) * (i + i + count - 1);
      start++;
      i += count;
    } else {
      const count = array[end];
      const spaces = array[start];
      if (count == spaces) {
        sum += (end / 2) * (count / 2) * (i + i + count - 1);
        start++;
        end -= 2;
        i += count;
      } else if (count > spaces) {
        sum += (end / 2) * (spaces / 2) * (i + i + spaces - 1);
        array[end] -= spaces;
        i += spaces;
        start++;
      } else {
        sum += (end / 2) * (count / 2) * (i + i + count - 1);
        array[start] -= count;
        i += count;
        end -= 2;
      }
    }
    // console.log(start, end, i, sum);
    // console.log(array[start], array[end]);
  }
  return sum;
}

export function problem09b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: number[] = input.trim().split("").map((x) => Number.parseInt(x));
  const start: number = 1;
  let end: number = array.length - 1;
  if (end % 2 != 0) {
    end--;
  }
  let i: number = 0;
  let sum: number = 0;
  const sums: number[] = [];
  array.forEach((x) => {
    sums.push(i);
    i += x;
  });
  while (end >= 0) {
    const count = array[end];
    let moved: boolean = false;
    for (let j = start; j < end; j += 2) {
      const spaces = array[j];
      if (count == spaces) {
        // console.log("moved " + (end / 2) + " to " + j);
        sum += (end / 2) * (count / 2) * (sums[j] + sums[j] + count - 1);
        array[j] -= count;
        end -= 2;
        moved = true;
        break;
      } else if (count > spaces) {
        //can't move
      } else {
        // console.log("moved " + (end / 2) + " to " + j);
        sum += (end / 2) * (count / 2) * (sums[j] + sums[j] + count - 1);
        array[j] -= count;
        sums[j] += count;
        // console.log("sums " + sums[j] + " and " + array[j] + " leftover");
        end -= 2;
        moved = true;
        break;
      }
    }
    if (!moved) {
      // console.log("failed to move " + (end / 2) + " from " +  sums[end]);
      sum += (end / 2) * (count / 2) * (sums[end] + sums[end] + count - 1);
      end -= 2;
    }
  }
  return sum;
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
