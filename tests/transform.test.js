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

test('should generate model uml with data types properly', function() {
  const input = `
export default class PersonModel extends Model {
  @attr('string') name;
  @attr('number') age;
  @attr('boolean') admin;
  @attr('date') birthday;
}`;

  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with data types with default values properly', function() {
  const input = `
  export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') email;
  @attr('boolean', { defaultValue: false }) verified;
  @attr('date', {
    defaultValue() { return new Date(); }
  }) createdAt;
}`;

  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with belongsTo relationship', () => {
  const input = `
  export default class UserModel extends Model {
  @belongsTo('profile') profile;
}`;
  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with hasMany relationship', () => {
  const input = `
  export default class BlogPostModel extends Model {
  @hasMany('comment') comments;
}`;
  const uml = transform(input);
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with one-to-many reflexive reelations', () => {
  const input = `
  export default class FolderModel extends Model {
  @hasMany('folder', { inverse: 'parent' }) children;
  @belongsTo('folder', { inverse: 'children' }) parent;
}`;

  expect(transform(input)).toMatchSnapshot();
});

test('should generate model uml with one-to-one reflexive relations', () => {
  const input = `
  export default class UserModel extends Model {
  @attr('string') name;
  @belongsTo('user', { inverse: 'bestFriend' }) bestFriend;
  }`;

  expect(transform(input)).toMatchSnapshot();
});

test('should generate model uml with reflexive relations without inverse', () => {
  const input = `
  export default class FolderModel extends Model {
  @belongsTo('folder', { inverse: null }) parent;
}`;

  expect(transform(input)).toMatchSnapshot();
});
