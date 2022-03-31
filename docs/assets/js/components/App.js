import { makeFont } from "../fontHelper.js"

import Style from "./Style.js"
import StencilEditor from "./StencilEditor.js"
import Input from "./Input.js"

export default {
  props: {
    init: Object,
  },
  data() {
    return {
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
        stretch: 1.5,
        skew: 0.25,
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
    <div class="col-6">
      <div class="card interactive">
        <div class="card-body">

          <Input :label="'shrink'" v-model="shrink" />
          <Input :label="'grow'"   v-model="grow" />
          <Input :label="'bevel'"  v-model="bevel" />

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

    <div class="col-6">
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
