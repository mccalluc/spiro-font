import { bufferPolygon } from "./geometry.js";

function x10(points) {
  // TODO: If the polygons are too small, this will error.
  const scaledUp = points.map((point) => [point[0], 100 - (point[1])]);
  // Shrink the segments away from each other...
  const eroded = bufferPolygon(scaledUp, -3, 1);
  // and then expand with rounded corners...
  return bufferPolygon(eroded, 3.5, 2)
}

export default class Stencil {
  constructor(segments) {
    self.segments = segments
  }

  getFontPath(segmentNames) {
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