import {findCentroid} from '../docs/assets/js/geometry.mjs';

test('findCentroid of square works', () => {
  expect(findCentroid([[0,0], [1,0], [1,1], [0,1]])).toStrictEqual([0.5, 0.5]);
});