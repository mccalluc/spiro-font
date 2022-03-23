import { drawSegment } from "./svgHelper.js";
import { makeFont, makeCssFontFace } from "./fontHelper.js"

export default {
  props: {
    baseUrl: String,
    name: String,
    sampleText: String,
    initSegmentMap: Object,
    initSegments: Object,
    initShrink: Number,
    initGrow: Number,
    initBevel: Number,
  },
  data() {
    return {
      currentChar: '8', 
      segmentMap: this.initSegmentMap,
      segments: this.initSegments,
      shrink: this.initShrink,
      grow: this.initGrow,
      bevel: this.initBevel,
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
    cssFontFace() {
      const css = makeCssFontFace('spiro-font', this.font);
      // Vue does not allow us to include <style> in a template;
      // Happy to find a better way to do this!
      document.getElementById('font-face').innerHTML = css;
      // ...but we still need to make sure the return value is used for reactivity to work.
      return css;
    }
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
  template: `
    <p><a :href="baseUrl">home</a></p>
    <h1>{{ name }}</h1>
    <details><summary>CSS font face</summary>
      <pre>
        {{ cssFontFace }}
      </pre>
    </details>
    <textarea rows="2" columns="12" class="style-me">{{ sampleText }}</textarea>
    <button class="style-me" @click="downloadFont">GET FONT</button>
    <textarea rows="10" :value="segmentMapAsText" @change="textToSegmentMap" />
    <label>shrink: <input type="number" v-model.lazy="shrink"></label>
    <label>grow: <input type="number" v-model.lazy="grow"></label>
    <label>bevel: <input type="number" v-model.lazy="bevel"></label>
    <select>
      <option v-for="char in charChoices">{{ char }}</option>
    </select>
    <div ref="raphael" />
  `
}
