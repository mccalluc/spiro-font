const reader = new jsts.io.GeoJSONReader();

export function bufferPolygon(polygon, bufferDistance, cornerCount) {
  // GeoJSON Polygon is actually a list of polygons,
  // with the latter polygons being holes in the first
  const geoJson = { type: 'Polygon', coordinates: [[...polygon, polygon[0]]] };
  const geometry = reader.read(geoJson).buffer(bufferDistance, cornerCount);
  // TODO: Get jsts.io.OL3Parser working:
  // "this.ol.geom is undefined"
  const pairs = geometry._shell._points._coordinates.map((point) => [point.x, point.y])
  return pairs.slice(1); // Start and end points are equal.
}

export function findCentroid(vertices) {
  // Adapted from https://stackoverflow.com/a/33852627
  let off = vertices[0];
  let twicearea = 0;
  let x = 0;
  let y = 0;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const p1 = vertices[i];
    const p2 = vertices[j];
    const f = (p1[0] - off[0]) * (p2[1] - off[1]) - (p2[0] - off[0]) * (p1[1] - off[1]);
    twicearea += f;
    x += (p1[0] + p2[0] - 2 * off[0]) * f;
    y += (p1[1] + p2[1] - 2 * off[1]) * f;
  }
  const sixArea = twicearea * 3;
  return [
    x / sixArea + off[0],
    y / sixArea + off[1]
  ];
}