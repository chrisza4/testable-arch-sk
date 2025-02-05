import { test, expect } from "bun:test";

type FunctionReturnNumber = () => number;
function doSomething(calculateFn: FunctionReturnNumber = calculate) {
  return calculateFn() + 2;
}

function calculate(): number {
  // Complex calculation
  return 5;
}

function main() {
  doSomething();
}

// Test
test("Just doSomething", () => {
  function mockCalculate(): number {
    return 10;
  }

  expect(doSomething(mockCalculate)).toEqual(12);
});
