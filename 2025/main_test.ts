import { assertEquals } from "@std/assert";
import { problem01a, problem01b } from "./src/problem01.ts";

Deno.test(function problem01Test() {
  const output = Deno.readTextFileSync(`outputs/01.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem01a(`inputs/01e.txt`), output[0]);
  assertEquals(problem01a(`inputs/01.txt`), output[1]);
  assertEquals(problem01b(`inputs/01e.txt`), output[2]);
  assertEquals(problem01b(`inputs/01.txt`), output[3]);
});

import { problem02a, problem02b } from "./src/problem02.ts";

Deno.test(function problem02Test() {
  const output = Deno.readTextFileSync(`outputs/02.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem02a(`inputs/02e.txt`), output[0]);
  assertEquals(problem02a(`inputs/02.txt`), output[1]);
  assertEquals(problem02b(`inputs/02e.txt`), output[2]);
  assertEquals(problem02b(`inputs/02.txt`), output[3]);
});

import { problem03a, problem03b } from "./src/problem03.ts";

Deno.test(function problem03Test() {
  const output = Deno.readTextFileSync(`outputs/03.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem03a(`inputs/03e.txt`), output[0]);
  assertEquals(problem03a(`inputs/03.txt`), output[1]);
  assertEquals(problem03b(`inputs/03e.txt`), output[2]);
  assertEquals(problem03b(`inputs/03.txt`), output[3]);
});
