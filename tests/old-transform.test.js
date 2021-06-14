/* globals test expect */
const transform = require("../src/transform");

  test("should generate transform public property properly", function() {

    const input = `
export default Component.extend({
  prop1: true
})`;

    expect(transform(input)).toMatchSnapshot();
  });

  test("should generate transform multiple properties properly", function() {

    const input = `
export default Component.extend({
  prop1: true,
  prop2: 'hello'
})`;

    expect(transform(input)).toMatchSnapshot();
  });


  test("should generate transform private property properly", function() {

    const input = `
export default Component.extend({
  _prop1: true
})`;


    expect(transform(input)).toMatchSnapshot();

  });


  test("should generate transform public method properly", function() {

    const input = `
export default Component.extend({
  method1() {
  }
})`;


    expect(transform(input)).toMatchSnapshot();

  });

test("should generate transform private method properly", function() {

    const input = `
export default Component.extend({
  _method1() {
  }
})`;

    expect(transform(input)).toMatchSnapshot();
  });


test("should generate transform service properties  properly", function() {

    const input = `
export default Component.extend({
  marketplace: service(),
  overlay: service()
})`;

    expect(transform(input)).toMatchSnapshot();
  });


test("should generate transform extends properly", function() {

    const input = `
export default Component.extend(Component1, Mixin1, {
  marketplace: service(),
  overlay: service()
})`;

    expect(transform(input)).toMatchSnapshot();
  });

