import { drawSegment } from "./svgHelper.js";

export default {
  props: {
    baseUrl: String,
    name: String,
    sampleText: String,
    segmentMap: Object,
    segments: Object,
    shrink: Number,
    grow: Number,
    bevel: Number,
  },
  computed: {
    segmentMapToText() {
      return Object.entries(this.segmentMap).map(([from, to]) => `${from} ${to}`).join('\n');
    }
  },
  mounted() {
    const raphaelContainer = this.$refs.raphael;
    const raphael = Raphael(raphaelContainer, 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
    for (let label in this.segments) {
      const vertices = this.segments[label].map(([x, y]) => [x, y]);
      drawSegment(raphael, label, vertices)
    }
  },
  template: `
  <p><a :href="baseUrl">home</a></p>
  <h1>{{ name }}</h1>
  <textarea rows="2" columns="12" class="style-me">{{ sampleText }}</textarea>
  <button class="style-me" id="download">GET FONT</button>
  <textarea rows="10" :value="segmentMapToText" />
  <div ref="raphael" />
  `
}
