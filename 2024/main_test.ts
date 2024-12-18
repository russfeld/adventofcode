import { assertEquals } from "@std/assert";
import { problem01a, problem01b } from "./src/problem01.ts";
import { problem02a, problem02b } from "./src/problem02.ts";
import { problem03a, problem03b } from "./src/problem03.ts";
import { problem04a, problem04b } from "./src/problem04.ts";
import { problem05a, problem05b } from "./src/problem05.ts";
import { problem06a, problem06b } from "./src/problem06.ts";
import { problem07a, problem07b } from "./src/problem07.ts";
import { problem08a, problem08b } from "./src/problem08.ts";
import { problem09a, problem09b } from "./src/problem09.ts";
import { problem10a, problem10b } from "./src/problem10.ts";
import { problem11a, problem11b } from "./src/problem11.ts";
import { problem12a, problem12b } from "./src/problem12.ts";
import { problem13a, problem13b } from "./src/problem13.ts";
import { problem14a, problem14b } from "./src/problem14.ts";
import { problem15a, problem15b } from "./src/problem15.ts";

Deno.test(function problem01Test() {
  const output = Deno.readTextFileSync(`outputs/01.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem01a(`inputs/01e.txt`), output[0]);
  assertEquals(problem01a(`inputs/01.txt`), output[1]);
  assertEquals(problem01b(`inputs/01e.txt`), output[2]);
  assertEquals(problem01b(`inputs/01.txt`), output[3]);
});

Deno.test(function problem02Test() {
  const output = Deno.readTextFileSync(`outputs/02.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem02a(`inputs/02e.txt`), output[0]);
  assertEquals(problem02a(`inputs/02.txt`), output[1]);
  assertEquals(problem02b(`inputs/02e.txt`), output[2]);
  assertEquals(problem02b(`inputs/02.txt`), output[3]);
});

Deno.test(function problem03Test() {
  const output = Deno.readTextFileSync(`outputs/03.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem03a(`inputs/03e.txt`), output[0]);
  assertEquals(problem03a(`inputs/03.txt`), output[1]);
  assertEquals(problem03b(`inputs/03e.txt`), output[2]);
  assertEquals(problem03b(`inputs/03.txt`), output[3]);
});

Deno.test(function problem04Test() {
  const output = Deno.readTextFileSync(`outputs/04.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem04a(`inputs/04e.txt`), output[0]);
  assertEquals(problem04a(`inputs/04.txt`), output[1]);
  assertEquals(problem04b(`inputs/04e.txt`), output[2]);
  assertEquals(problem04b(`inputs/04.txt`), output[3]);
});

Deno.test(function problem05Test() {
  const output = Deno.readTextFileSync(`outputs/05.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem05a(`inputs/05e.txt`), output[0]);
  assertEquals(problem05a(`inputs/05.txt`), output[1]);
  assertEquals(problem05b(`inputs/05e.txt`), output[2]);
  assertEquals(problem05b(`inputs/05.txt`), output[3]);
});

Deno.test(function problem06Test() {
  const output = Deno.readTextFileSync(`outputs/06.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem06a(`inputs/06e.txt`), output[0]);
  assertEquals(problem06a(`inputs/06.txt`), output[1]);
  assertEquals(problem06b(`inputs/06e.txt`), output[2]);
  assertEquals(problem06b(`inputs/06.txt`), output[3]);
});

Deno.test(function problem07Test() {
  const output = Deno.readTextFileSync(`outputs/07.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem07a(`inputs/07e.txt`), output[0]);
  assertEquals(problem07a(`inputs/07.txt`), output[1]);
  assertEquals(problem07b(`inputs/07e.txt`), output[2]);
  assertEquals(problem07b(`inputs/07.txt`), output[3]);
});

Deno.test(function problem08Test() {
  const output = Deno.readTextFileSync(`outputs/08.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem08a(`inputs/08e.txt`), output[0]);
  assertEquals(problem08a(`inputs/08.txt`), output[1]);
  assertEquals(problem08b(`inputs/08e.txt`), output[2]);
  assertEquals(problem08b(`inputs/08.txt`), output[3]);
});

Deno.test(function problem09Test() {
  const output = Deno.readTextFileSync(`outputs/09.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem09a(`inputs/09e.txt`), output[0]);
  assertEquals(problem09a(`inputs/09.txt`), output[1]);
  assertEquals(problem09b(`inputs/09e.txt`), output[2]);
  assertEquals(problem09b(`inputs/09.txt`), output[3]);
});

Deno.test(function problem10Test() {
  const output = Deno.readTextFileSync(`outputs/10.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem10a(`inputs/10e.txt`), output[0]);
  assertEquals(problem10a(`inputs/10.txt`), output[1]);
  assertEquals(problem10b(`inputs/10e.txt`), output[2]);
  assertEquals(problem10b(`inputs/10.txt`), output[3]);
});

Deno.test(function problem11Test() {
  const output = Deno.readTextFileSync(`outputs/11.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem11a(`inputs/11e.txt`), output[0]);
  assertEquals(problem11a(`inputs/11.txt`), output[1]);
  assertEquals(problem11b(`inputs/11e.txt`), output[2]);
  assertEquals(problem11b(`inputs/11.txt`), output[3]);
});

Deno.test(function problem12Test() {
  const output = Deno.readTextFileSync(`outputs/12.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem12a(`inputs/12e.txt`), output[0]);
  assertEquals(problem12a(`inputs/12.txt`), output[1]);
  assertEquals(problem12b(`inputs/12e.txt`), output[2]);
  assertEquals(problem12b(`inputs/12.txt`), output[3]);
});

Deno.test(function problem13Test() {
  const output = Deno.readTextFileSync(`outputs/13.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem13a(`inputs/13e.txt`), output[0]);
  assertEquals(problem13a(`inputs/13.txt`), output[1]);
  assertEquals(problem13b(`inputs/13e.txt`), output[2]);
  assertEquals(problem13b(`inputs/13.txt`), output[3]);
});

Deno.test(function problem14Test() {
  const output = Deno.readTextFileSync(`outputs/14.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem14a(`inputs/14e.txt`), output[0]);
  assertEquals(problem14a(`inputs/14.txt`), output[1]);
  assertEquals(problem14b(`inputs/14e.txt`), output[2]);
  assertEquals(problem14b(`inputs/14.txt`), output[3]);
});

Deno.test(function problem15Test() {
  const output = Deno.readTextFileSync(`outputs/15.txt`).split("\n").map((x) => Number.parseInt(x));
  assertEquals(problem15a(`inputs/15e.txt`), output[0]);
  assertEquals(problem15a(`inputs/15.txt`), output[1]);
  assertEquals(problem15b(`inputs/15e.txt`), output[2]);
  assertEquals(problem15b(`inputs/15.txt`), output[3]);
});
