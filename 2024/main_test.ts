import { assertEquals } from "@std/assert";
import { problem01a, problem01b } from "./src/problem01.ts";
import { problem02a, problem02b } from "./src/problem02.ts";

Deno.test(function problem01Test() {
  ["e", ""].forEach((suffix) => {
    const output_a = Deno.readTextFileSync(`outputs/01${suffix}a.txt`);
    assertEquals(
      problem01a(`inputs/01${suffix}.txt`),
      Number.parseInt(output_a),
    );
    const output_b = Deno.readTextFileSync(`outputs/01${suffix}b.txt`);
    assertEquals(
      problem01b(`inputs/01${suffix}.txt`),
      Number.parseInt(output_b),
    );
  });
});

Deno.test(function problem02Test() {
  ["e", ""].forEach((suffix) => {
    const output_a = Deno.readTextFileSync(`outputs/02${suffix}a.txt`);
    assertEquals(
      problem02a(`inputs/02${suffix}.txt`),
      Number.parseInt(output_a),
    );
    const output_b = Deno.readTextFileSync(`outputs/02${suffix}b.txt`);
    assertEquals(
      problem02b(`inputs/02${suffix}.txt`),
      Number.parseInt(output_b),
    );
  });
});
