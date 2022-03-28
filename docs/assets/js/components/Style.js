export default {
  props: {
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
      .spiro-font {
        display: block; /* "display: none" on load to avoid flash of unstyled text. */
      }
      {{ cssFontFace }}
    </component>

    <details><summary class="btn btn-primary">Copy CSS</summary>
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
