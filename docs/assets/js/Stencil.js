const reader = new jsts.io.GeoJSONReader();

function bufferPolygon(polygon, bufferDistance, cornerCount) {
  // GeoJSON Polygon is actually a list of polygons,
  // with the latter polygons being holes in the first
  const geoJson = { type: 'Polygon', coordinates: [[...polygon, polygon[0]]] };
  const geometry = reader.read(geoJson).buffer(bufferDistance, cornerCount);
  // TODO: Get jsts.io.OL3Parser working:
  // "this.ol.geom is undefined"
  const pairs = geometry._shell._points._coordinates.map((point) => [point.x, point.y])
  return pairs.slice(1); // Start and end points are equal.
}

function scale({points, shrink, grow, bevel}) {
  // TODO: Make more robust against bad geometry.
  const scaledUp = points.map((point) => [point[0], 180 - (point[1])]);
  // Shrink the segments away from each other...
  const eroded = bufferPolygon(scaledUp, -shrink, 1);
  // and then expand with rounded corners...
  return bufferPolygon(eroded, grow, bevel);
}

export default class Stencil {
  constructor({segments, shrink, grow, bevel}) {
    self.segments = segments;
    self.shrink = shrink;
    self.grow = grow;
    self.bevel = bevel;
  }

  getFontPath(segmentNames) {
    const path = new opentype.Path();
    const segments = self.segments;
    segmentNames.forEach((name) => {
      try {
        const segment = scale({points: segments[name], shrink, grow, bevel});
        path.moveTo(...segment[0]);
        segment.slice(1).forEach((point) => {
          path.lineTo(...point);
        })
        path.lineTo(...segment[0]);
      } catch(e) {
        console.warn('Geometry problem', e);
      }
    })
    return path;
  }
}