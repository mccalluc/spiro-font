export default function drawSegment({raphael, label, segments, segmentClickHandler}) {
  const vertices = segments[label];
  const first = vertices[0];
  const rest = vertices.slice(1);
  const path = [
    ['M', ...first],
    ...rest.map((pair) => ['L', ...pair]),
    ['Z']
  ];

  const polygon = raphael.path(path).data('label', label).attr('stroke', '#fff');
  polygon.click(segmentClickHandler);
  polygon.node.setAttribute('id', `segment-${label}`);

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
        polygon.attr({path});
      }
    }
  }
  const controls = raphael.setFinish();

  controls.attr({fill: '#000', stroke: '#fff'});  
  controls.drag(onMove, onStart, function onEnd() {
    const cx = round(this.attr('cx'));
    const cy = round(this.attr('cy'));
    this.attr({cx, cy});
    const newSegments = getSegments(raphael)
    segments[label] = newSegments[label];
  });
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

function getSegments(raphael) {
  const segments = {};
  raphael.forEach((element) => {
    const label = element.getData()?.label
    if (!label) return;
    segments[label] = element.attrs.path.slice(0, -1).map((step) => step.slice(1));
  });
  return segments
}
