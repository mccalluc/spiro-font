import { findCentroid } from "./geometry.js";

export default class FontControls {
  constructor({segmentMap, segments, controlsContainer, onChange}) {
    const textareaContainer = document.createElement('div');
    const svgContainer = document.createElement('div');
    controlsContainer.appendChild(textareaContainer);
    controlsContainer.appendChild(svgContainer);
    this.onChange = onChange;

    this.textarea = document.createElement('textarea');
    this.textarea.rows = 10;
    this.textarea.value = segmentMapToText(segmentMap);
    const getSegmentMap = this.getSegmentMap.bind(this);
    const getSegments = this.getSegments.bind(this);
    this.textarea.onkeyup = function() {
      onChange({segments: getSegments(), segmentMap: getSegmentMap()})
    }
    textareaContainer.appendChild(this.textarea);

    this.raphael = Raphael(svgContainer, 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
    for (let label in segments) {
      const vertices = segments[label].map(([x, y]) => [x, y]);
      this.drawSegment(label, vertices)
    }
  }

  getSegmentMap() {
    const text = this.textarea.value;
    const segmentMap = Object.fromEntries(
      text.split('\n')
      .map((line) => line.split(/\s+/))
      .filter(([key, value]) => Boolean(key))
    );
    return {' ': '', ...segmentMap}
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
    const getSegmentMap = this.getSegmentMap.bind(this);

    controls.attr({fill: '#000', stroke: '#fff'});  
    controls.drag(onMove, onStart, function() {
      // Originally, onChange was called during drag,
      // but the style flash on Chrome is distracting.
      const cx = round(this.attr('cx'));
      const cy = round(this.attr('cy'));
      this.attr({cx, cy});
      onChange({segments: getSegments(), segmentMap: getSegmentMap()});
    });
  }
}

function segmentMapToText(segmentMap) {
  return Object.entries(segmentMap).map(([from, to]) => `${from} ${to}`).join('\n');
}

function textToSegmentMap(text) {
  const segmentMap = Object.fromEntries(
    text.split('\n')
    .map((line) => line.split(/\s+/))
    .filter(([key, value]) => Boolean(key))
  );
  return {' ': '', ...segmentMap}
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
  return Math.round(x/10) * 10
}