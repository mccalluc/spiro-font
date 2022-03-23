import { makeCssFontFace } from "../fontHelper.js"

export default {
  props: {
    currentChar: String,
    segmentMap: Object,
    segments: Object,
    font: Object,
  },
  data() {
    return {}
  },
  computed: {
    cssFontFace() {
      return makeCssFontFace('spiro-font', this.font);
    }
  },
  template: `
    <component :is="'style'">
      {{ cssFontFace }}
      <template v-for="(_, segmentName) in segments">
        <template v-if="segmentMap[currentChar].includes(segmentName)">
          #segment-{{segmentName}} {
            fill: #444;
          }
        </template>
        <template v-else>
          #segment-{{segmentName}} {
            fill: #BBB;
          }
        </template>
      </template>
    </component>

    <details><summary>CSS font face</summary>
      <pre>
        {{ cssFontFace }}
      </pre>
    </details>
  `
}
