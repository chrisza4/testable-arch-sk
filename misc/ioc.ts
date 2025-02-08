import "reflect-metadata";

const CanBeInjected: ClassDecorator = (c) => {};

class Container {
  private instances = new Map();

  resolve<T>(target: new (...args: any[]) => T): T {
    // Get constructor parameter types
    const paramTypes: any[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    console.log("==ParamTypes:", paramTypes, "of class:", target);
    // Recursively resolve dependencies
    const dependencies = paramTypes.map((param) => this.resolve(param));

    // Create an instance with resolved dependencies
    const instance = new target(...dependencies);
    this.instances.set(target, instance);

    return instance;
  }
}

// Define dependencies
@CanBeInjected
class A {
  sayHello() {
    console.log("Hello from A!");
  }
}

@CanBeInjected
class B {
  sayHello() {
    console.log("Hello from B!");
  }
}

@CanBeInjected
class MyClass {
  constructor(public a: A, public b: B) {}

  greet() {
    this.a.sayHello();
    this.b.sayHello();
  }
}

// Usage
const container = new Container();
const myClassInstance = container.resolve(MyClass);
myClassInstance.greet();
