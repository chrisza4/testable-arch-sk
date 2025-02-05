import { test, expect } from "bun:test";
class ClassA {
  private b: ClassB;
  constructor(b: ClassB) {
    this.b = b;
  }
  doSomething() {
    return this.b.calculate() + 2;
  }
}
class ClassB {
  calculate(): number {
    // Complex calculation
    return 5;
  }
}

// Actual code

function main() {
  const a = new ClassA(new ClassB());
  console.log(a.doSomething());
}

// Test code

class MockB extends ClassB {
  calculate(): number {
    return 10;
  }
}

test("Just classA", () => {
  const subject = new ClassA(new MockB());
  expect(subject.doSomething()).toEqual(12);
});

main();
