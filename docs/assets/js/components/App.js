import { makeFont } from "../fontHelper.js"

import Style from "./Style.js"
import StencilEditor from "./StencilEditor.js"

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
    StencilEditor
  },
  template: `
    <div class="col-6">
      <div class="card interactive">
        <div class="card-body">

          <div class="form-group row py-1">
            <div class="col-6">
              <label for="shrink">shrink:</label>
            </div>
            <div class="col-6">
              <input type="number" class="form-control" id="shrink" v-model.lazy="shrink">
            </div>
          </div>

          <div class="form-group row py-1">
            <div class="col-6">
              <label for="grow" class="float-right">grow:</label>
            </div>
            <div class="col-6">
              <input type="number" class="form-control" id="grow" v-model.lazy="grow">
            </div>
          </div>

          <div class="form-group row py-1">
            <div class="col-6">
              <label for="bevel">bevel:</label>
            </div>
            <div class="col-6">
              <input type="number" class="form-control" id="bevel" v-model.lazy="bevel">
            </div>
          </div>

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
