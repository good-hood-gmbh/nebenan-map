const { assert } = require('chai');

const {
  reverse,
  bindTo,
} = require('../../lib/utils');


describe('utils', () => {
  it('reverse', () => {
    const arr = [1, 2, 3];

    assert.notEqual(reverse(arr), arr, 'do not modify original array');
    assert.deepEqual(reverse(arr), [3, 2, 1], 'reverse items');
  });

  it('bindTo', () => {
    const obj = {
      handler() { return this; },
      anotherHandler() { return this; },
    };

    bindTo(obj, 'handler', 'anotherHandler', 'unexistend');

    const result1 = obj.handler();
    const result2 = obj.anotherHandler();

    assert.deepEqual(result1, obj, 'bound 1st func');
    assert.deepEqual(result2, obj, 'bound 2nd func');
  });
});
