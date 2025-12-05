export function problem05a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[] = input.split(/\s{2}/);
  const ranges: number[][] = array[0].split("\n").map((x) =>
    x.split("-").map((y) => Number.parseInt(y))
  );
  const items: number[] = array[1].split("\n").map((x) => Number.parseInt(x));
  const ranges_sorted = ranges.sort((a, b) =>
    a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]
  );
  const ranges_consolidated: number[][] = [];
  let start = ranges_sorted[0][0];
  let end = ranges_sorted[0][1];
  // console.log(ranges_sorted)
  const len: number = ranges_sorted.length;
  for (let i = 1; i < len; i++) {
    if (end < ranges_sorted[i][0] - 1) {
      ranges_consolidated.push([start, end]);
      start = ranges_sorted[i][0];
      end = ranges_sorted[i][1];
    } else {
      end = ranges_sorted[i][1] > end ? ranges_sorted[i][1] : end;
    }
  }
  ranges_consolidated.push([start, end]);
  // console.log(ranges_consolidated)
  const items_sorted = items.sort((a, b) => a - b);
  const len_items = items_sorted.length;
  const len_ranges = ranges_consolidated.length;
  let range_index: number = 0;
  let count: number = 0;
  // console.log(`Number of items ${len_items}`)
  // console.log(`Checking range ${ranges_consolidated[range_index]}`)
  for (let i = 0; i < len_items; i++) {
    const item = items_sorted[i];
    while (
      range_index < len_ranges && ranges_consolidated[range_index][1] < item
    ) {
      range_index += 1;
      // console.log(`Checking range ${ranges_consolidated[range_index]}`)
    }
    if (range_index >= len_ranges) {
      // console.log(`Item [${i}] ${item} is not in range`)
      continue;
    }
    if (
      item >= ranges_consolidated[range_index][0] &&
      item <= ranges_consolidated[range_index][1]
    ) {
      // console.log(`Item [${i}] ${item} is in range`)
      count += 1;
    } else {
      // console.log(`Item [${i}] ${item} is not in range`)
    }
  }
  return count;
}

export function problem05b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const array: string[] = input.split(/\s{2}/);
  const ranges: number[][] = array[0].split("\n").map((x) =>
    x.split("-").map((y) => Number.parseInt(y))
  );
  const ranges_sorted = ranges.sort((a, b) =>
    a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]
  );
  const ranges_consolidated: number[][] = [];
  let start = ranges_sorted[0][0];
  let end = ranges_sorted[0][1];
  // console.log(ranges_sorted)
  const len: number = ranges_sorted.length;
  for (let i = 1; i < len; i++) {
    if (end < ranges_sorted[i][0] - 1) {
      ranges_consolidated.push([start, end]);
      start = ranges_sorted[i][0];
      end = ranges_sorted[i][1];
    } else {
      end = ranges_sorted[i][1] > end ? ranges_sorted[i][1] : end;
    }
  }
  ranges_consolidated.push([start, end]);
  // console.log(ranges_consolidated)
  let count: number = 0;
  for (const range of ranges_consolidated) {
    count += range[1] - range[0] + 1;
  }
  return count;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem05a("inputs/05e.txt"));
  console.log(problem05b("inputs/05e.txt"));
  console.log("Real Inputs");
  console.log(problem05a("inputs/05.txt"));
  console.log(problem05b("inputs/05.txt"));
}

Deno.bench("problem05a", () => {
  problem05a("inputs/05.txt");
});

Deno.bench("problem05b", () => {
  problem05b("inputs/05.txt");
});
