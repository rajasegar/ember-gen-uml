const assert = require("assert");
const transform = require("../src/transform");

describe("transform test: ", function() {

  it("should generate transform public property properly", function() {

    const input = `
export default Component.extend({
  prop1: true
})`;

    const output = `
@startuml

class MyClass {
  +prop1
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });

  it("should generate transform multiple properties properly", function() {

    const input = `
export default Component.extend({
  prop1: true,
  prop2: 'hello'
})`;

    const output = `
@startuml

class MyClass {
  +prop1
  +prop2
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });


  it("should generate transform private property properly", function() {

    const input = `
export default Component.extend({
  _prop1: true
})`;

    const output = `
@startuml

class MyClass {
  -_prop1
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });


  it("should generate transform public method properly", function() {

    const input = `
export default Component.extend({
  method1() {
  }
})`;

    const output = `
@startuml

class MyClass {
  +method1()
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });

it("should generate transform private method properly", function() {

    const input = `
export default Component.extend({
  _method1() {
  }
})`;

    const output = `
@startuml

class MyClass {
  -_method1()
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });


it("should generate transform service properties  properly", function() {

    const input = `
export default Component.extend({
  marketplace: service(),
  overlay: service()
})`;

    const output = `
@startuml
class marketplace << (S, #FF7700) >>
MyClass ..> marketplace : service
class overlay << (S, #FF7700) >>
MyClass ..> overlay : service
class MyClass {
  +marketplace
  +overlay
}

@enduml`;

    const uml = transform(input, "MyClass");

    assert.strictEqual(uml,output);
  });
});
