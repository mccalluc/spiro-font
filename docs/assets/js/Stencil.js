import opentype from 'https://cdn.skypack.dev/opentype.js@1.3.4';
import jsts from 'https://cdn.skypack.dev/jsts@2.3.0';

const reader = new jsts.io.GeoJSONReader();

function pairsToGeom(pairs) {
  // GeoJSON Polygon is actually a list of polygons,
  // with the latter polygons being holes in the first
  const geoJson = { type: 'Polygon', coordinates: [[...pairs, pairs[0]]] };
  const geometry = reader.read(geoJson);
  return geometry;
}

function geomToPairs(geometry) {
  const pairs = geometry._shell._points._coordinates.map((point) => [point.x, point.y])
  return pairs.slice(1); // Start and end points are equal.
}

function scale({points, stretch, skew, shrink, grow, bevel}) {
  const transformation = new jsts.geom.util.AffineTransformation();
  transformation.scale(stretch, 1).shear(skew, 0);

  // TODO: Make more robust against bad geometry.
  const scaledUp = points.map((point) => [point[0], 180 - (point[1])]);

  const geometry = pairsToGeom(scaledUp);
  const transformed = transformation.transform(
    geometry
      // Shrink the segments away from each other...
      .buffer(-shrink, 1)
      // and then expand with rounded corners...
      .buffer(grow, bevel)
  );

  return geomToPairs(transformed)
}

export default class Stencil {
  constructor({segments, stretch, skew, shrink, grow, bevel}) {
    self.segments = segments;
    self.stretch = stretch;
    self.skew = skew;
    self.shrink = shrink;
    self.grow = grow;
    self.bevel = bevel;
  }

  getFontPath(segmentNames) {
    const path = new opentype.Path();
    const segments = self.segments;
    segmentNames.forEach((name) => {
      const segment = scale({
        points: segments[name],
        stretch: self.stretch,
        skew: self.skew,
        shrink: self.shrink,
        grow: self.grow,
        bevel: self.bevel,
      });
      if (segment.length) {
        path.moveTo(...segment[0]);
        segment.slice(1).forEach((point) => {
          path.lineTo(...point);
        })
        path.lineTo(...segment[0]);
      }
    })
    return path;
  }
}