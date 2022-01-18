export function makeFont(fontName, targetChar) {
  const glyphs = [];
  const max = 1000;

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: max,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const path = new opentype.Path();
  // https://github.com/opentypejs/opentype.js
  path.moveTo(500, 500);
  path.quadTo(250, 500, 100, 100)
  path.quadTo(1000, 0, 1000, 1000);
  path.quadTo(250, 500, 100, 100)
  path.lineTo(0, 1000);
  // more drawing instructions...
  const aGlyph = new opentype.Glyph({
    name: targetChar,
    unicode: targetChar.codePointAt(),
    advanceWidth: max,
    path: path
  });
  glyphs.push(aGlyph)

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: max,
    ascender: max,
    descender: 0,
    glyphs: glyphs
  });
  return font;
}

function fontAsBase64(font) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(font.toArrayBuffer())));
}

export function makeCssFontFace(fontName, font) {
  const fontBase64 = fontAsBase64(font);
  return `
@font-face {
  font-family: "${fontName}";
  src: url('data:font/opentype;base64,${fontBase64}');
}`;
}
