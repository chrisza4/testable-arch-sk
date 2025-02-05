class ClassA {
  private b: ClassB;
  constructor(b: ClassB) {
    this.b = b;
  }
  a() {
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
}

// Test code

class MockB extends ClassB {
  calculate(): number {
    return 10;
  }
}
