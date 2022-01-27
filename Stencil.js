function x10(points) {
  return points.map((point) => [point[0] * 10, point[1] * 10])
}

export default class Stencil {
  constructor() {
    self.segments = {
      A: [[1, 13], [2, 14], [6, 14], [7, 13], [6, 12], [2, 12]],
      B: [[1, 7], [2, 8], [6, 8], [7, 7], [6, 6], [2, 6]],
      C: [[1, 1], [2, 2], [6, 2], [7, 1], [6, 0], [2, 0]],

      D: [[1, 13], [2, 12], [2, 8], [1, 7], [0, 8], [0, 12]],
      E: [[1, 7], [2, 6], [2, 2], [1, 1], [0, 2], [0, 6]],

      F: [[7, 13], [8, 12], [8, 8], [7, 7], [6, 8], [6, 12]],
      G: [[7, 7], [8, 6], [8, 2], [7, 1], [6, 2], [6, 6]],
    }
  }

  getPath(...segmentNames) {
    const path = new opentype.Path();
    const segments = self.segments;
    segmentNames.forEach((name) => {
      const segment = x10(segments[name]);
      path.moveTo(...segment[0]);
      segment.slice(1).forEach((point) => {
        path.lineTo(...point);
      })
      path.lineTo(...segment[0]);
    })
    return path;
  }
}