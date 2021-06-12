/* globals test expect */
const transform = require('../src/transform-typescript');

test('should generate transform public property properly', function() {
  const input = `
export default class MyClass extends Component{
  prop1: boolean = true;
}`;

  const uml = transform('my-class.ts', input, 'MyClass');
  expect(uml).toMatchSnapshot();
});

test('should generate multiple properties properly', function() {
  const input = `
export default class MyClass extends Component{
  prop1: boolean =  true;
  prop2: string  = 'hello';
}`;

  const uml = transform('my-class.ts', input, 'MyClass');
  expect(uml).toMatchSnapshot();
});

test('should generate  public method properly', function() {
  const input = `
export default class MyClass extends Component{
  method1() {
  }
}`;

  const uml = transform('my-class.ts', input, 'MyClass');
  expect(uml).toMatchSnapshot();
});

test('should generate transform service properties  properly', function() {
  const input = `
export default class MyClass extends Component{
  @service i18n!: I18N;
  @service store!: DS.Store;
}`;

  const uml = transform('my-class.ts', input, 'MyClass');
  expect(uml).toMatchSnapshot();
});
