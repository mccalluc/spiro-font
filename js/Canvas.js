import { findCentroid } from "./geometry.js";

export default class Canvas {
  constructor({segments, domId}) {
    this.raphael = Raphael(document.getElementById(domId), 0, 0, 200, 200);
    for (let label in segments) {
      const vertices = segments[label].map(([x, y]) => [x, y]);
      this.drawSegment(label, vertices)
    }
  }

  drawSegment(label, vertices){
    const first = vertices[0];
    const rest = vertices.slice(1);
    const path = [
      ['M', ...first],
      ...rest.map((pair) => ['L', ...pair]),
      ['Z']
    ];

    const polygon = this.raphael.path(path).attr('fill','#444');

    const centroid = findCentroid(vertices);
    const text = this.raphael.text(centroid[0], centroid[1], label).attr('fill', '#fff');

    this.raphael.setStart();

    for (let i = 0; i < vertices.length; i++) {
      this.raphael.circle(...vertices[i], 3).update = function(dx,dy) {
        const cx = this.attr('cx') + dx;
        const cy = this.attr('cy') + dy;
        this.attr({cx, cy});
        
        path[i][1] = round(cx);
        path[i][2] = round(cy);
        const vFromPath = path.slice(0,-1).map(triple => [triple[1], triple[2]])
        const centroid = findCentroid(vFromPath);
        text.attr({x: centroid[0], y: centroid[1]})
        
        polygon.attr({path});
      }
    }

    const controls = this.raphael.setFinish();
    controls.attr({fill: '#000', stroke: '#fff'});  
    controls.drag(onMove, onStart, onEnd);
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