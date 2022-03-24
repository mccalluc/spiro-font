import { drawSegment } from "../svgHelper.js";
import { makeFont } from "../fontHelper.js"

import Style from "./Style.js"

export default {
  props: {
    baseUrl: String,
    name: String,
    sampleText: String,
    params: Object,
  },
  data() {
    return {
      currentChar: '8',
      segmentMap: this.params.segmentMap,
      segments: this.params.segments,
      shrink: this.params.shrink,
      grow: this.params.grow,
      bevel: this.params.bevel,
    }
  },
  computed: {
    charChoices() {
      return Object.keys(this.segmentMap);
    },
    segmentMapAsText() {
      return Object.entries(this.segmentMap).map(([from, to]) => `${from} ${to}`).join('\n');
    },
    font() {
      console.groupCollapsed('Font paramters')
      console.log(`segmentMap: ${JSON.stringify(this.segmentMap, null, 2)}`);
      console.log(`segments: ${JSON.stringify(this.segments).replaceAll(',"', ',\n  "')}`);
      console.groupEnd();
      const font = makeFont({
        fontName: 'spiro-font',
        segmentMap: this.segmentMap,
        segments: this.segments,
        shrink: this.shrink,
        grow: this.grow,
        bevel: this.bevel
      });
      return font;
    },
  },
  methods: {
    downloadFont() {
      this.font.download()
    },
    textToSegmentMap(event) {
      const text = event.target.value;
      const segmentMap = Object.fromEntries(
        text.split('\n')
        .map((line) => line.split(/\s+/))
        .filter(([key]) => Boolean(key))
      );
      this.segmentMap = {' ': '', ...segmentMap};
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
      })
    }
  },
  components: {
    Style,
  },
  template: `
    <Style
      :currentChar="currentChar"
      :segmentMap="segmentMap"
      :segments="segments"
      :font="font"
    />
    <p><a :href="baseUrl">home</a></p>
    <h1>{{ name }}</h1>
    <textarea rows="2" columns="12" class="style-me">{{ sampleText }}</textarea>
    <button class="style-me" @click="downloadFont">GET FONT</button>
    <textarea rows="10" :value="segmentMapAsText" @change="textToSegmentMap" />
    <label>shrink: <input type="number" v-model.lazy="shrink"></label>
    <label>grow: <input type="number" v-model.lazy="grow"></label>
    <label>bevel: <input type="number" v-model.lazy="bevel"></label>
    <select v-model="currentChar">
      <option v-for="char in charChoices" :value="char" v-html="char" />
    </select>
    <div ref="raphael" />
  `
}
