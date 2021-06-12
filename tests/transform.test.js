/* globals test expect */
const transform = require('../src/transform');

test('should generate transform public property properly', function() {
  const input = `
export default class MyComponent extends Component {
  prop1 = true;
}`;

  const uml = transform(input);

  expect(uml).toMatchSnapshot();
});

test('should generate transform multiple properties properly', function() {
  const input = `
export default class MyComponent extends Component {
  prop1 =  true;
  prop2 = 'hello';
}`;

  const uml = transform(input);

  expect(uml).toMatchSnapshot();
});

test('should generate transform public method properly', function() {
  const input = `
export default class MyComponent extends Component {
  method1() {
  }
}`;

  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate transform service properties  properly', function() {
  const input = `
export default class MyComponent extends Component {
  @service marketplace;
  @service overlay;
}`;

  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate model uml properly', function() {
  const input = `
export default class PersonModel extends Model {
  @attr title;
  @attr name;
  @attr birthday;
}`;

  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});
