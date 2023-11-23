import { expect, test } from "bun:test";

import { one_a, one_b } from "./src/one";
import { two_a, two_b } from "./src/two";
import { three_a, three_b } from "./src/three";
import { four_a, four_b } from "./src/four";
import { five_a, five_b } from "./src/five";
import { six_a, six_b } from "./src/six";
import { seven_a, seven_b } from "./src/seven";
import { eight_a, eight_b } from "./src/eight";
import { nine_a, nine_b } from "./src/nine";
import { ten_a, ten_b } from "./src/ten";
import { eleven_a, eleven_b } from "./src/eleven";
import { twelve_a, twelve_b } from "./src/twelve";
import { thirteen_a, thirteen_b } from "./src/thirteen";

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

test("seven", async () => {
  expect(await seven_a()).toBe(348996);
  expect(await seven_b()).toBe(98231647);
});

test("eight", async () => {
  expect(await eight_a()).toBe(534);
  expect(await eight_b()).toBe(1070188);
});

test("nine", async () => {
  expect(await nine_a()).toBe(496);
  expect(await nine_b()).toBe(902880);
});

test("ten", async () => {
  expect(await ten_a()).toBe(271245);
  expect(await ten_b()).toBe(1685293086);
});

test("eleven", async () => {
  expect(await eleven_a()).toBe(1793);
  expect(await eleven_b()).toBe(247);
});

test("twelve", async () => {
  expect(await twelve_a()).toBe(5576);
  expect(await twelve_b()).toBe(152837);
});

test("thirteen", async () => {
  expect(await thirteen_a()).toBe(745);
  expect(await thirteen_b()).toBe(99);
});
