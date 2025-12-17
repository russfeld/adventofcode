export function problem12a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const blocks: string[] = input.split(/\s{2}/);
  const sizes: number[] = [];
  let count = 0;
  for (const block of blocks.slice(0, -1)) {
    sizes.push(block.split("").reduce((a, b) => b == "#" ? a + 1 : a, 0));
  }
  // console.log(sizes)
  const trees = blocks[blocks.length - 1].split("\n");
  let i: number = 1;
  for (const tree of trees) {
    const splits = tree.split(":");
    const size = splits[0].split("x").map((x) => Number.parseInt(x));
    const counts = splits[1].trim().split(" ").map((x) => Number.parseInt(x));
    // console.log(size)
    // console.log(counts)
    const num_blocks = counts.reduce((a, b) => a + b) * 9;
    const area = counts.map((a, b) => a * sizes[b]).reduce((a, b) => a + b);
    // console.log(area)
    // console.log(num_blocks)
    if (size[0] * size[1] >= num_blocks) {
      // console.log(`${i}: trivially yes`)
      count++;
    } else if (size[0] * size[1] < area) {
      // console.log(`${i}: trivially no`)
    } else {
      //console.log(`${i}: unknown but probably! ${size[0] * size[1] } with ${area} and ${num_blocks} `)
      count++;
    }
    i += 1;
  }
  return count;
}

export function problem12b(inputfile: string): number {
  return inputfile.length * 0;
}

if (import.meta.main) {
  console.log("Example Inputs");
  console.log(problem12a("inputs/12e.txt"));
  // console.log(problem12b("inputs/12e.txt"));
  console.log("Real Inputs");
  console.log(problem12a("inputs/12.txt"));
  // console.log(problem12b("inputs/12.txt"));
}

Deno.bench("problem12a", () => {
  problem12a("inputs/12.txt");
});

Deno.bench("problem12b", () => {
  problem12b("inputs/12.txt");
});
