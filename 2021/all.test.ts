import { expect, test } from "bun:test";

import { one_a, one_b } from "./src/one";
import { two_a, two_b } from "./src/two";
import { three_a, three_b } from "./src/three";
import { four_a, four_b } from "./src/four";
import { five_a, five_b } from "./src/five";
import { six_a, six_b } from "./src/six";

test("one", async () => {
  expect(await one_a()).toBe(1681);
  expect(await one_b()).toBe(1704);
});

test("two", async () => {
  expect(await two_a()).toBe(1727835);
  expect(await two_b()).toBe(1544000595);
});

test("three", async () => {
  expect(await three_a()).toBe(3958484);
  expect(await three_b()).toBe(1613181);
});

test("four", async () => {
  expect(await four_a()).toBe(41503);
  expect(await four_b()).toBe(3178);
});

test("five", async () => {
  expect(await five_a()).toBe(5373);
  expect(await five_b()).toBe(21514);
});

test("six", async () => {
  expect(await six_a()).toBe(362740);
  expect(await six_b()).toBe(1644874076764);
});