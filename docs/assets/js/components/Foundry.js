import { drawSegment } from "../svgHelper.js";

export default {
  props: {
    initSegmentMap: Object,
    initSegments: Object,
  },
  data() {
    return {
      currentChar: '8',
      segmentMap: this.initSegmentMap,
      segments: this.initSegments,
    }
  },
  computed: {
    charChoices() {
      return Object.keys(this.segmentMap);
    },
  },
  mounted() {
    const raphaelContainer = this.$refs.raphael;
    const raphael = Raphael(raphaelContainer, 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
    for (const label in this.segments) {
      drawSegment({
        raphael,
        label,
        segments: this.segments,
      })
    }
  },
  template: `
    <select v-model="currentChar">
      <option v-for="char in charChoices" :value="char" v-html="char" />
    </select>
    <div ref="raphael" />
  `
}
