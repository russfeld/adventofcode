export function problem05a(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const sects = input.split("\n\n");
  const rules: { [id: number]: number[] } = {};
  sects[0].split("\n").forEach((line) => {
    const pages = line.split("|").map((x) => Number.parseInt(x));
    if (Object.prototype.hasOwnProperty.call(rules, pages[0])) {
      rules[pages[0]].push(pages[1]);
    } else {
      rules[pages[0]] = [pages[1]];
    }
  });
  let sum: number = 0;
  sects[1].split("\n").forEach((line) => {
    const pages = line.split(",").map((x) => Number.parseInt(x));
    let bad: boolean = false;
    for (let i = 0; i < pages.length - 1; i++) {
      const page = pages[i];
      for (let j = i + 1; j < pages.length; j++) {
        if (
          Object.prototype.hasOwnProperty.call(rules, page) &&
          !rules[page].includes(pages[j])
        ) {
          bad = true;
          break;
        }
        if (
          Object.prototype.hasOwnProperty.call(rules, pages[j]) &&
          rules[pages[j]].includes(page)
        ) {
          bad = true;
          break;
        }
      }
      if (bad) {
        break;
      }
    }
    if (!bad) {
      sum += pages[Math.floor(pages.length / 2)];
    }
  });
  return sum;
}

export function problem05b(inputfile: string): number {
  const input = Deno.readTextFileSync(inputfile);
  const sects = input.split("\n\n");
  const rules: { [id: number]: number[] } = {};
  sects[0].split("\n").forEach((line) => {
    const pages = line.split("|").map((x) => Number.parseInt(x));
    if (Object.prototype.hasOwnProperty.call(rules, pages[0])) {
      rules[pages[0]].push(pages[1]);
    } else {
      rules[pages[0]] = [pages[1]];
    }
  });
  let sum: number = 0;
  sects[1].split("\n").forEach((line) => {
    const pages = line.split(",").map((x) => Number.parseInt(x));
    const filtered: { [id: number]: number[] } = {};
    for (let i = 0; i < pages.length; i++) {
      filtered[pages[i]] = Object.hasOwnProperty.call(rules, pages[i]) ? rules[pages[i]].filter((x) => pages.includes(x)) : [];
    }
    //console.log(filtered);
    pages.sort((a, b) => filtered[b].length - filtered[a].length);
    //console.log(pages);
    if (pages.join(",") !== line) {
      sum += pages[Math.floor(pages.length / 2)];
    }
  });
  return sum;
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
