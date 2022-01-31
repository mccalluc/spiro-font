import { findCentroid } from "./geometry.js";

export default class Canvas {
  constructor({segments, targetDivId, onChange}) {
    this.onChange = onChange;
    this.raphael = Raphael(document.getElementById(targetDivId), 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
    for (let label in segments) {
      const vertices = segments[label].map(([x, y]) => [x, y]);
      this.drawSegment(label, vertices)
    }
  }

  getSegments() {
    const segments = {};
    this.raphael.forEach((element) => {
      const label = element.getData()?.label
      if (!label) return;
      segments[label] = element.attrs.path.slice(0, -1).map((step) => step.slice(1));
    });
    return segments
  }

  drawSegment(label, vertices){
    const first = vertices[0];
    const rest = vertices.slice(1);
    const path = [
      ['M', ...first],
      ...rest.map((pair) => ['L', ...pair]),
      ['Z']
    ];

    const polygon = this.raphael.path(path).attr('fill','#444').data('label', label);

    const centroid = findCentroid(vertices);
    const text = this.raphael.text(centroid[0], centroid[1], label).attr('fill', '#fff');

    this.raphael.setStart();
    for (let i = 0; i < vertices.length; i++) {
      this.raphael.circle(...vertices[i], 3).update = function(dx,dy) {
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
          // Orginally, onChange was called here... now in drag onEnd.
        }
      }
    }
    const controls = this.raphael.setFinish();

    const onChange = this.onChange;
    const getSegments = this.getSegments.bind(this);

    controls.attr({fill: '#000', stroke: '#fff'});  
    controls.drag(onMove, onStart, function() {
      // Originally, onChange was called during drag,
      // but the style flash on Chrome is distracting.
      const cx = round(this.attr('cx'));
      const cy = round(this.attr('cy'));
      this.attr({cx, cy});
      onChange(getSegments());
    });
  }
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

function onEnd() {
  const cx = round(this.attr('cx'));
  const cy = round(this.attr('cy'));
  this.attr({cx, cy});
}

function round(x) {
  return Math.round(x/10) * 10
}