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
      if (this.segmentMap[this.currentChar].includes(segment)) {
        // TODO: Let's just use a set, instead of munging strings.
        const prev = this.segmentMap[this.currentChar];
        this.segmentMap[this.currentChar] = prev.replace(segment, '')
      } else {
        this.segmentMap[this.currentChar] += segment;
      }
      this.$emit('update:segmentMap')
    }
  },
  mounted() {
    const raphaelContainer = this.$refs.raphael;
    const raphael = Raphael(raphaelContainer, 0, 0, 200, 200).setViewBox(-20, -20, 300, 300);
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
