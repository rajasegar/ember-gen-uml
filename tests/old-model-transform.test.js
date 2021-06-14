/* globals test expect */
const transform = require("../src/transform");

test('should generate model uml properly', function() {
  const input = `
export default DS.Model.extend({
  title: DS.attr(),
  name: DS.attr(),
  birthday: DS.attr(),
})`;

  const uml = transform(input, 'Person');
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with data types properly', function() {
  const input = `
export default DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number'),
  admin: DS.attr('boolean'),
  birthday: DS.attr('date'),
})`;

  const uml = transform(input, 'User');
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with data types with default values properly', function() {
  const input = `
export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  verified: DS.attr('boolean', { defaultValue: false }),
  createdAt: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
})`;

  const uml = transform(input,'User');
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with belongsTo relationship', () => {
  const input = `
export default DS.Model.extend({
  profile: DS.belongsTo('profile'),
})`;
  const uml = transform(input, 'User');
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with hasMany relationship', () => {
  const input = `
export default DS.Model.extend({
  comments: DS.hasMany('comment'),
})`;
  const uml = transform(input, 'BlogPost');
  expect(uml).toMatchSnapshot();
});

test('should generate model uml with one-to-many reflexive reelations', () => {
  const input = `
export default DS.Model.extend({
  children: DS.hasMany('folder', { inverse: 'parent' }),
  parent: DS.belongsTo('folder', { inverse: 'children' }),
})`;

  expect(transform(input, 'Folder')).toMatchSnapshot();
});

test('should generate model uml with one-to-one reflexive relations', () => {
  const input = `
export default DS.Model.extend({
  name: DS.attr('string'),
  bestFriend: DS.belongsTo('user', { inverse: 'bestFriend' }),
})`;

  expect(transform(input, 'User')).toMatchSnapshot();
});

test('should generate model uml with reflexive relations without inverse', () => {
  const input = `
export default DS.Model.extend({
  parent: DS.attr('belongsTo', { inverse: null }),
})`;

  expect(transform(input,'Child')).toMatchSnapshot();
});
