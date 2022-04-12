import makeFont from "../makeFont.js"
import replaceUrlParam from "../replaceUrlParam.js";

import Style from "./Style.js"
import StencilEditor from "./StencilEditor.js"
import Input from "./Input.js"

function fillLowerCase(segmentMap) {
  const chars = new Set(Object.keys(segmentMap));
  const uppersWithoutLowers = Array.from(chars).filter(
    char => !chars.has(char.toLowerCase())
  );
  const lowersMap = Object.fromEntries(uppersWithoutLowers.map(
    char => [char.toLowerCase(), segmentMap[char]]
  ));
  return {...segmentMap, ...lowersMap};
}

export default {
  props: {
    init: Object,
  },
  data() {
    return {
      segmentMap: fillLowerCase(this.init.segmentMap),
      segments: this.init.segments,
      stretch: this.init.stretch,
      pad: this.init.pad,
      skew: this.init.skew,
      shrink: this.init.shrink,
      grow: this.init.grow,
      bevel: this.init.bevel,
    }
  },
  watch: {
    // Watches, and deep comparisons in particular, are usually not
    // the best option, but in this case they let us handle these
    // two structured parameters the same way, in the same place.
    segmentMap: {
      handler(newSegmentMap) {
        replaceUrlParam('segmentMap', JSON.stringify(newSegmentMap));
      },
      deep: true
    },
    segments: {
      handler(newSegments) {
        replaceUrlParam('segments', JSON.stringify(newSegments));
      },
      deep: true
    },
  },
  computed: {
    charChoices() {
      return Object.keys(this.segmentMap);
    },
    font() {
      const font = makeFont({
        fontName: 'spiro-font',
        segmentMap: this.segmentMap,
        segments: this.segments,
        stretch: this.stretch,
        pad: this.pad,
        skew: this.skew,
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
  },
  components: {
    Style,
    StencilEditor,
    Input,
  },
  template: `
    <div class="col-12 col-sm-6 mb-3">
      <div class="card interactive">
        <div class="card-body">

          <Input :label="'stretch'" v-model="stretch" min="0.5"  max="2.0"  step="0.1" />
          <Input :label="'pad'"     v-model="pad"     min="-10"  max="10"   step="1"   />
          <Input :label="'skew'"    v-model="skew"    min="-1.0" max="1.0"  step="0.1" />
          <Input :label="'shrink'"  v-model="shrink"  min="0"    max="20"   step="1"   />
          <Input :label="'grow'"    v-model="grow"    min="0"    max="20"   step="1"   />
          <Input :label="'bevel'"   v-model="bevel"   min="0"    max="4"    step="1"   />

          <div class="form-group row py-1">
            <div class="col-12">
              <button @click="downloadFont" class="btn btn-primary py-1">Download font</button>
            </div>
          </div>

          <div class="form-group row py-1">
            <div class="col-12">
              <Style
                :segmentMap="segmentMap"
                :segments="segments"
                :font="font"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-6 mb-3">
      <div class="card interactive">
        <div class="card-body">
          <StencilEditor
            :segmentMap="segmentMap"
            :segments="segments"
          />
        </div>
      </div>
    </div>
  `
}
