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