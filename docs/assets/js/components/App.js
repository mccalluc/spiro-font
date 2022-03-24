import { makeFont } from "../fontHelper.js"

import Style from "./Style.js"
import Foundry from "./Foundry.js"

export default {
  props: {
    init: Object,
  },
  data() {
    return {
      currentChar: '8',
      segmentMap: this.init.segmentMap,
      segments: this.init.segments,
      shrink: this.init.shrink,
      grow: this.init.grow,
      bevel: this.init.bevel,
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
  components: {
    Style,
    Foundry
  },
  template: `
    <Style
      :currentChar="currentChar"
      :segmentMap="segmentMap"
      :segments="segments"
      :font="font"
    />

    <button class="style-me" @click="downloadFont">GET FONT</button>

    <textarea rows="10" :value="segmentMapAsText" @change="textToSegmentMap" />
    <label>shrink: <input type="number" v-model.lazy="shrink"></label>
    <label>grow: <input type="number" v-model.lazy="grow"></label>
    <label>bevel: <input type="number" v-model.lazy="bevel"></label>

    <Foundry
      :initSegmentMap="segmentMap"
      :initSegments="segments"
    />
  `
}
