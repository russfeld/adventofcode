import { assertEquals } from "@std/assert";
import { problem01a, problem01b } from "./src/problem01.ts";
// import { problem02a, problem02b } from "./src/problem02.ts";
// import { problem03a, problem03b } from "./src/problem03.ts";
// import { problem04a, problem04b } from "./src/problem04.ts";
// import { problem05a, problem05b } from "./src/problem05.ts";
// import { problem06a, problem06b } from "./src/problem06.ts";
// import { problem07a, problem07b } from "./src/problem07.ts";
// import { problem08a, problem08b } from "./src/problem08.ts";
// import { problem09a, problem09b } from "./src/problem09.ts";
// import { problem10a, problem10b } from "./src/problem10.ts";
// import { problem11a, problem11b } from "./src/problem11.ts";
// import { problem12a, problem12b } from "./src/problem12.ts";
// import { problem13a, problem13b } from "./src/problem13.ts";
// import { problem14a, problem14b } from "./src/problem14.ts";
// import { problem15a, problem15b } from "./src/problem15.ts";
// import { problem16a, problem16b } from "./src/problem16.ts";
// import { problem17a, problem17b } from "./src/problem17.ts";
// import { problem18a, problem18b } from "./src/problem18.ts";
// import { problem19a, problem19b } from "./src/problem19.ts";
// import { problem20a, problem20b } from "./src/problem20.ts";

Deno.test(function problem01Test() {
  const output = Deno.readTextFileSync(`outputs/01.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem01a(`inputs/01e.txt`), output[0]);
  assertEquals(problem01a(`inputs/01.txt`), output[1]);
  assertEquals(problem01b(`inputs/01e.txt`), output[2]);
  assertEquals(problem01b(`inputs/01.txt`), output[3]);
});

