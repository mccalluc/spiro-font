import Raphael from 'https://cdn.skypack.dev/raphael@2.3.0';

import { drawSegment } from "../svgHelper.js";

export default {
  props: {
    segmentMap: Object,
    segments: Object,
  },
  emits: [
    'update:segmentMap',
    'update:segments'
  ],
  data() {
    return {
      currentChar: '8',
    }
  },
  computed: {
    charChoices() {
      return Object.keys(this.segmentMap);
    },
  },
  methods: {
    segmentClickHandler(e) {
      // TODO: Is the label available?
      // If not, get rid of it?
      const segment = e.target.id.split('-')[1];
      const prev = this.segmentMap[this.currentChar];
      
      // TODO: Let's just use a set, instead of munging strings.
      const newSegments = prev.includes(segment)
        ? prev.replace(segment, '')
        : prev + segment;
      this.segmentMap[this.currentChar] = newSegments;
    }
  },
  mounted() {
    const raphaelContainer = this.$refs.raphael;
    const raphael = Raphael(raphaelContainer, 0, 0, 200, 200).setViewBox(-40, -40, 290, 290);
    for (const label in this.segments) {
      drawSegment({
        raphael,
        label,
        segments: this.segments,
        segmentClickHandler: this.segmentClickHandler,
      })
    }
  },
  template: `
    <component :is="'style'">
      <template v-for="(_, segmentName) in segments">
        #segment-{{segmentName}} {
          <template v-if="segmentMap[currentChar].includes(segmentName)">
            fill: #444;
          </template>
          <template v-else>
            fill: #BBB;
          </template>
        }
      </template>
    </component>
    <select v-model="currentChar">
      <option v-for="char in charChoices" :value="char" v-html="char" />
    </select>
    <div ref="raphael" />
  `
}
