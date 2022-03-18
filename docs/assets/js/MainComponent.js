function drawSegment(raphael, label, vertices) {
  const first = vertices[0];
  const rest = vertices.slice(1);
  const path = [
    ['M', ...first],
    ...rest.map((pair) => ['L', ...pair]),
    ['Z']
  ];

  const polygon = raphael.path(path).attr('fill','#444').data('label', label);

  // const centroid = findCentroid(vertices);
  // const text = raphael.text(centroid[0], centroid[1], label).attr('fill', '#fff');

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
        // Orginally, onChange was called here... now in drag onEnd.
      }
    }
  }

  // const controls = this.raphael.setFinish();

  // const onChange = this.onChange;
  // const getSegments = this.getSegments.bind(this);
  // const getSegmentMap = this.getSegmentMap.bind(this);

  // controls.attr({fill: '#000', stroke: '#fff'});  
  // controls.drag(onMove, onStart, function() {
  //   // Originally, onChange was called during drag,
  //   // but the style flash on Chrome is distracting.
  //   const cx = round(this.attr('cx'));
  //   const cy = round(this.attr('cy'));
  //   this.attr({cx, cy});
  //   onChange({segments: getSegments(), segmentMap: getSegmentMap()});
  // });
}

export default {
  props: {
    baseUrl: String,
    page: Object,
  },
  computed: {
    segmentMapToText() {
      const {segmentMap} = this.page;
      return Object.entries(segmentMap).map(([from, to]) => `${from} ${to}`).join('\n');
    }
  },
  mounted() {
    console.log('mounted!');
    const raphaelContainer = this.$refs.raphael;
    const raphael = Raphael(raphaelContainer, 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
    for (let label in this.page.segments) {
      const vertices = this.page.segments[label].map(([x, y]) => [x, y]);
      drawSegment(raphael, label, vertices)
    }
  },
  template: `
  <p><a :href="baseUrl">home</a></p>
  <h1>{{ page.name }}</h1>
  <textarea rows="2" columns="12" class="style-me">{{ page.sampleText }}</textarea>
  <button class="style-me" id="download">GET FONT</button>
  <textarea rows="10" :value="segmentMapToText" />
  <div ref="raphael" />
  `
}
