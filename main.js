function getFont() {
  // Create the bézier paths for each of the glyphs.
  // Note that the .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
  });

  const glyphs = [notdefGlyph];
  for (let ascii = 65; ascii < 65 + 3; ascii++) {
    const aPath = new opentype.Path();
    aPath.moveTo(100, 0);
    aPath.lineTo(100, 700);
    aPath.lineTo(100, 800);
    aPath.lineTo(300, 300);
    // more drawing instructions...
    const aGlyph = new opentype.Glyph({
      name: String.fromCharCode(ascii),
      unicode: ascii,
      advanceWidth: 650,
      path: aPath
    });
    glyphs.push(aGlyph)
  }
  console.log(glyphs)

  const font = new opentype.Font({
    familyName: 'Demo',
    styleName: 'Medium',
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs
  });
  return font;
}

function fontAsBase64(font) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(font.toArrayBuffer())));
}

export default function main(iframeId) {
  const font = getFont();
  const base64 = fontAsBase64(font);
  console.log(base64);
  // font.download();
}

function getCssFontFace(fontName, font) {
  const fontBase64 = fontAsBase64(font);
  return `
@font-face {
  font-family: "${fontName}";
  src: url('data:font/opentype;base64,${fontBase64}');
}`;
}

function getIframeHtml() {
  const font = getFont();
  const fontName = 'Demo';
  return `
<html>
  <!DOCTYPE html>
  <head>
  <style>
    ${getCssFontFace(fontName, font)}
    body { font-family: '${fontName}'; }
  </style>
  </head>
  <body>
    ABC
  </body>
</html>`;
}

export function getIframeSrc() {
  return `data:text/html,${encodeURIComponent(getIframeHtml())}`
}