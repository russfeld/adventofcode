import { expect, test } from "bun:test";

import { one } from "./one";

test("one", () => {
  expect(one()).toBe(5);
});