import { bufferPolygon } from "./geometry.js";

function scale(points) {
  // TODO: Make more robust against bad geometry.
  const scaledUp = points.map((point) => [point[0], 180 - (point[1])]);
  // Shrink the segments away from each other...
  const eroded = bufferPolygon(scaledUp, -8, 1);
  // and then expand with rounded corners...
  return bufferPolygon(eroded, 11, 0)
}

export default class Stencil {
  constructor(segments) {
    self.segments = segments
  }

  getFontPath(segmentNames) {
    const path = new opentype.Path();
    const segments = self.segments;
    segmentNames.forEach((name) => {
      try {
        const segment = scale(segments[name]);
        path.moveTo(...segment[0]);
        segment.slice(1).forEach((point) => {
          path.lineTo(...point);
        })
        path.lineTo(...segment[0]);
      } catch(e) {
        console.log('Geometry problem', e);
      }
    })
    return path;
  }
}