const { assert } = require('chai');

const {
  reverse,
} = require('../../lib/utils');


describe('utils', () => {
  it('reverse', () => {
    const arr = [1, 2, 3];

    assert.notEqual(reverse(arr), arr, 'do not modify original array');
    assert.deepEqual(reverse(arr), [3, 2, 1], 'reverse items');
  });
});
