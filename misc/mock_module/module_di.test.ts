import { doSomething } from "./moduleA";
import { test, expect, mock } from "bun:test";

test("doSomething", () => {
  mock.module("./moduleB", () => {
    return {
      calculate: () => 10,
    };
  });

  expect(doSomething()).toEqual(12);
});
