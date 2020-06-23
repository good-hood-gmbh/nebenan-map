const { assert } = require('chai');

const {
  getID,
} = require('../../lib/utils');


describe('utils', () => {
  it('getID', () => {
    const id1 = getID();
    const id2 = getID();

    assert.isString(id1, 'returns a string');
    assert.lengthOf(id1, 8, 'returns proper length');
    assert.notEqual(id1, id2, 'ids don\'t match');
    assert.match(id1, /^[a-f0-9]+$/, 'correct pattern format');
  });
});
