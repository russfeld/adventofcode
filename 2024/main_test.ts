import { assertEquals } from "@std/assert";
import { problem01a, problem01b } from "./src/problem01.ts";
import { problem02a, problem02b } from "./src/problem02.ts";
import { problem03a, problem03b } from "./src/problem03.ts";
import { problem04a, problem04b } from "./src/problem04.ts";
import { problem05a, problem05b } from "./src/problem05.ts";
import { problem06a, problem06b } from "./src/problem06.ts";
import { problem07a, problem07b } from "./src/problem07.ts";
import { problem08a, problem08b } from "./src/problem08.ts";

Deno.test(function problem01Test() {
  const output = Deno.readTextFileSync(`outputs/01.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem01a(`inputs/01e.txt`), output[0]);
  assertEquals(problem01a(`inputs/01.txt`), output[1]);
  assertEquals(problem01b(`inputs/01e.txt`), output[2]);
  assertEquals(problem01b(`inputs/01.txt`), output[3]);
});

Deno.test(function problem02Test() {
  const output = Deno.readTextFileSync(`outputs/02.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem02a(`inputs/02e.txt`), output[0]);
  assertEquals(problem02a(`inputs/02.txt`), output[1]);
  assertEquals(problem02b(`inputs/02e.txt`), output[2]);
  assertEquals(problem02b(`inputs/02.txt`), output[3]);
});

Deno.test(function problem03Test() {
  const output = Deno.readTextFileSync(`outputs/03.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem03a(`inputs/03e.txt`), output[0]);
  assertEquals(problem03a(`inputs/03.txt`), output[1]);
  assertEquals(problem03b(`inputs/03e.txt`), output[2]);
  assertEquals(problem03b(`inputs/03.txt`), output[3]);
});

Deno.test(function problem04Test() {
  const output = Deno.readTextFileSync(`outputs/04.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem04a(`inputs/04e.txt`), output[0]);
  assertEquals(problem04a(`inputs/04.txt`), output[1]);
  assertEquals(problem04b(`inputs/04e.txt`), output[2]);
  assertEquals(problem04b(`inputs/04.txt`), output[3]);
});

Deno.test(function problem05Test() {
  const output = Deno.readTextFileSync(`outputs/05.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem05a(`inputs/05e.txt`), output[0]);
  assertEquals(problem05a(`inputs/05.txt`), output[1]);
  assertEquals(problem05b(`inputs/05e.txt`), output[2]);
  assertEquals(problem05b(`inputs/05.txt`), output[3]);
});

Deno.test(function problem06Test() {
  const output = Deno.readTextFileSync(`outputs/06.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem06a(`inputs/06e.txt`), output[0]);
  assertEquals(problem06a(`inputs/06.txt`), output[1]);
  assertEquals(problem06b(`inputs/06e.txt`), output[2]);
  assertEquals(problem06b(`inputs/06.txt`), output[3]);
});

Deno.test(function problem07Test() {
  const output = Deno.readTextFileSync(`outputs/07.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem07a(`inputs/07e.txt`), output[0]);
  assertEquals(problem07a(`inputs/07.txt`), output[1]);
  assertEquals(problem07b(`inputs/07e.txt`), output[2]);
  assertEquals(problem07b(`inputs/07.txt`), output[3]);
});

Deno.test(function problem08Test() {
  const output = Deno.readTextFileSync(`outputs/08.txt`).split("\n").map((x) =>
    Number.parseInt(x)
  );
  assertEquals(problem08a(`inputs/08e.txt`), output[0]);
  assertEquals(problem08a(`inputs/08.txt`), output[1]);
  assertEquals(problem08b(`inputs/08e.txt`), output[2]);
  assertEquals(problem08b(`inputs/08.txt`), output[3]);
});
