const assert = require('assert');
const transform = require('../src/transform-typescript');

describe('transform typescript test: ', function() {
  it('should generate transform public property properly', function() {
    const input = `
export default class MyClass extends Component{
  prop1: boolean = true;
}`;

    const output = `
@startuml


class MyClass {
  +prop1 : Boolean
}

@enduml`;

    const uml = transform('my-class.ts', input, 'MyClass');

    assert.strictEqual(uml, output);
  });

  it('should generate multiple properties properly', function() {
    const input = `
export default class MyClass extends Component{
  prop1: boolean =  true;
  prop2: string  = 'hello';
}`;

    const output = `
@startuml


class MyClass {
  +prop1 : Boolean
  +prop2 : String
}

@enduml`;

    const uml = transform('my-class.ts', input, 'MyClass');

    assert.strictEqual(uml, output);
  });

  it('should generate  public method properly', function() {
    const input = `
export default class MyClass extends Component{
  method1() {
  }
}`;

    const output = `
@startuml


class MyClass {
  +method1()
}

@enduml`;

    const uml = transform('my-class.ts', input, 'MyClass');

    assert.strictEqual(uml, output);
  });

  it('should generate transform service properties  properly', function() {
    const input = `
export default class MyClass extends Component{
  @service i18n!: I18N;
  @service store!: DS.Store;
}`;

    const output = `
@startuml

class i18n << (S, #FF7700) >>
MyClass ..> i18n : service
class store << (S, #FF7700) >>
MyClass ..> store : service
class MyClass {
  
}

@enduml`;

    const uml = transform('my-class.ts', input, 'MyClass');

    assert.strictEqual(uml, output);
  });
});
