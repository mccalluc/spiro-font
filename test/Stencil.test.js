import { strict as assert } from 'assert';

import { pairsToGeom, geomToPairs } from '../docs/assets/js/Stencil.js';

describe('pairs to geom to pairs', () => {
  it('works', () => {
    const oldPairs = [[0,0], [0,1], [1,0]];
    const newGeom = pairsToGeom(oldPairs);
    const newPairs = geomToPairs(newGeom);
    assert.equal(oldPairs, newPairs)
  })
});