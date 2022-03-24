export default {
  props: {
    currentChar: String,
    segmentMap: Object,
    segments: Object,
    font: Object,
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

    <details><summary>Use this font</summary>
      Copy and paste this into your HTML:
      <pre>
&lt;style&gt;
.spiro-font {
  font-family: 'spiro-font';
}
{{ cssFontFace }}
&lt;/style&gt;
&lt;div class="spiro-font"&gt;
  Hello world!
&lt;/div&gt;
      </pre>
    </details>
  `
}

function fontAsBase64(font) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(font.toArrayBuffer())));
}

function makeCssFontFace(fontName, font) {
  const fontBase64 = fontAsBase64(font);
  return `
@font-face {
  font-family: "${fontName}";
  src: url('data:font/opentype;base64,${fontBase64}');
}`;
}
