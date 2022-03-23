export function drawSegment({raphael, label, segments}) {
  const vertices = segments[label];
  const first = vertices[0];
  const rest = vertices.slice(1);
  const path = [
    ['M', ...first],
    ...rest.map((pair) => ['L', ...pair]),
    ['Z']
  ];

  const polygon = raphael.path(path).data('label', label);
  polygon.node.setAttribute('id', `segment-${label}`);

  const centroid = findCentroid(vertices);
  const text = raphael.text(centroid[0], centroid[1], label).attr('fill', '#fff');

  raphael.setStart();
  for (let i = 0; i < vertices.length; i++) {
    raphael.circle(...vertices[i], 3).update = function(dx,dy) {
      const cx = this.attr('cx') + dx;
      const cy = this.attr('cy') + dy;
      this.attr({cx, cy});
      
      const oldX = path[i][1];
      const oldY = path[i][2];
      const newX = round(cx);
      const newY = round(cy);
      if (oldX !== newX || oldY !== newY) {
        path[i][1] = newX;
        path[i][2] = newY;
        const vFromPath = path.slice(0,-1).map(triple => [triple[1], triple[2]])
        const centroid = findCentroid(vFromPath);
        text.attr({x: centroid[0], y: centroid[1]})
        polygon.attr({path});
      }
    }
  }

  const controls = raphael.setFinish();
  controls.attr({fill: '#000', stroke: '#fff'});  
  controls.drag(onMove, onStart, function() {
    const cx = round(this.attr('cx'));
    const cy = round(this.attr('cy'));
    this.attr({cx, cy});
    const newSegments = getSegments(raphael)
    segments[label] = newSegments[label];
  });
}

function getSegments(raphael) {
  const segments = {};
  raphael.forEach((element) => {
    const label = element.getData()?.label
    if (!label) return;
    segments[label] = element.attrs.path.slice(0, -1).map((step) => step.slice(1));
  });
  return segments
}

function findCentroid(vertices) {
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

function onMove(dx,dy) {
  this.update(dx - this.dx, dy - this.dy);
  this.dx = dx;
  this.dy = dy;
}

function onStart() {
  this.dx = 0;
  this.dy = 0;
}

function round(x) {
  return Math.round(x/5) * 5
}